import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/users.service';
import { Request, Response } from 'express';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService, //
  ) { }

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
      { secret: 'myAccessKey', expiresIn: '1h' }
    );
    await res.setHeader('Set-Cookie', `accessToken=${accessToken}`)
  }
  async loginUser({ email, password, context }) {
    const user = await this.userService.findOne({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 틀렸습니다.');
    this.setRefreshToken({ user, res: context.res });
    return this.setAccessToken({ user, res: context.res });
  }
  async social_login({ req, res }) {
    let user = await this.userService.findOne({ email: req.user.email });
    const hashedPassword = await bcrypt.hash(req.user.password, 10);
    if (!user) {
      user = await this.userService.create({
        createUserInput: {
          email: req.user.email,
          password: hashedPassword,
          name: req.user.name,
          nickname: req.user.nickname,
        },
      });
    }
    await this.setRefreshToken({ user, res });
    const accessToken = await this.setAccessToken({ user, res });
    res.status(200).json({
      ok: true
    })
  }
}
