import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/users.service';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService, //
  ) {}

  async setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );
    await res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
  }
  async setAccessToken({ user, res }) {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
    await res.setHeader('Set-Cookie', `accessToken=${accessToken}`);
    return accessToken;
  }
  async loginUser({ email, password, context }) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new UnprocessableEntityException('이메일이 없습니다.');
    }
    if (user.social)
      throw new UnprocessableEntityException(
        `${user.social} 소셜로그인한 이메일입니다.`,
      );
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 틀렸습니다.');
    await this.setRefreshToken({ user, res: context.res });
    return await this.setAccessToken({ user, res: context.res });
  }

  async social_login({ req, res }) {
    let user = await this.userService.findOne({ email: req.user.email });
    const hashedPassword = await bcrypt.hash(req.user.password, 10);

    if (!user) {
      user = await this.userRepository.save({
        email: req.user.email,
        password: hashedPassword,
        nickname: req.user.nickname,
        social: req.user.social,
      });
    }
    await this.setRefreshToken({ user, res });
    const accessToken = await this.setAccessToken({ user, res });
    res.status(200).json({
      ok: true,
    });
  }
}
