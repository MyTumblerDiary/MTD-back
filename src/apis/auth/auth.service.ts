import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService, //
  ) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
  }
  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }
  async loginUser({ email, password, context }) {
    //1. 로그인(이메일이 일치하는 유저를 DB에서 찾기)
    const user = await this.userService.findOne({ email });
    //2. 일치하는 유저가 없으면?! 에러 던지기!!!
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');
    //3. 일치하는 유저가 있지만, 비밀번호가 틀렸다면?! 에러던지기
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 틀렸습니다.');
    //4. refreshToken(=JWT)을 만들어서 프론트엔드(쿠키)에 보내주기
    this.setRefreshToken({ user, res: context.res });
    // //5. 일치하는 유저가 있으면?! accessToken(=JWT)
    return this.getAccessToken({ user });
  }
  async social_login({ req, res }) {
    //1. 가입확인
    console.log(req.user.email);
    let user = await this.userService.findOne({ email: req.user.email });
    //2. 회원가입
    const hashedPassword = await bcrypt.hash(req.user.password, 10);
    if (!user) {
      user = await this.userService.create({
        createUserInput: {
          email: req.user.email,
          password: hashedPassword,
          name: req.user.name,
          age: req.user.age,
        },
      });
    }
    //3. 로그인
    this.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/MTD/front/social-login.html');
  }
}
