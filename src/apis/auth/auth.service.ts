import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import axios from 'axios';
import * as qs from 'qs';
import { UserService } from '../users/users.service';
import { RefreshToken } from './entities/refreshToken.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshtokenRepository: Repository<RefreshToken>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService, //
  ) {}

  async setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: process.env.REFRESH_SECRET_KEY, expiresIn: '2w' },
    );
    const hashedRefreshToken = await bcrypt.hash(refreshToken.toString(), 10);
    await this.refreshtokenRepository.save({
      refreshToken: hashedRefreshToken,
      user,
    });
  }
  async setAccessToken({ user, res }) {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
    await res.setHeader('Set-Cookie', `accessToken=${accessToken}; Path=/`);
    return accessToken;
  }
  async loginUser({ email, password, context }) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnprocessableEntityException(
        '해당 이메일이 등록되어 있지 않습니다.',
      );
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

  async getKakaoAccessToken(code: string) {
    const token = await axios({
      //token
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.OAUTH_KAKAO_ID,
        client_secret: process.env.OAUTH_KAKAO_SECRET,
        redirect_uri: process.env.OAUTH_KAKAO_REDIRECT_URI,
        code,
      }),
    });
    return token.data.access_token;
  }

  async getUserByKakaoAccessToken({ accessToken }) {
    const result = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = result.data;
    return data;
  }
  async kakaoLogin({ accessToken, context }) {
    const profile = await this.getUserByKakaoAccessToken({
      accessToken,
    });
    let user = await this.userService.findOneByEmail(
      profile.kakao_account.email,
    );
    const hashedPassword = await bcrypt.hash(profile.id.toString(), 10);
    if (user && user.social !== 'kakao') {
      const errorMessage = `${user.email} 이메일로 이미 가입된 계정이 있습니다.`;
      throw new UnprocessableEntityException(errorMessage, user.email);
    } else if (!user) {
      user = await this.userRepository.save({
        email: profile.kakao_account.email,
        password: hashedPassword,
        nickname: profile.properties.nickname,
        social: 'kakao',
      });
    }
    await this.setRefreshToken({ user, res: context.res });
    return {
      accessToken: await this.setAccessToken({ user, res: context.res }),
    };
  }

  async getGoogleAccessToken(code: string): Promise<string> {
    const data = qs.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.OAUTH_GOOGLE_ID,
      client_secret: process.env.OAUTH_GOOGLE_SECRET,
      redirect_uri: process.env.OAUTH_GOOGLE_CALLBACK,
      code: decodeURIComponent(code),
    });

    const response = await axios.post(
      'https://oauth2.googleapis.com/token',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data.access_token;
  }

  async getUserByGoogleAccessToken(accessToken) {
    const result = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const data = result.data;
    return data;
  }

  async googleLogin({ accessToken, context }) {
    const profile = await this.getUserByGoogleAccessToken(accessToken);
    let user = await this.userService.findOneByEmail(profile.email);
    const hashedPassword = await bcrypt.hash(profile.sub.toString(), 10);
    if (user && user.social !== 'google') {
      const errorMessage = `${user.email} 이메일로 이미 가입된 계정이 있습니다.`;
      throw new UnprocessableEntityException(errorMessage, user.email);
    } else if (!user) {
      user = await this.userRepository.save({
        email: profile.email,
        password: hashedPassword,
        nickname: profile.email.split('@')[0],
        social: 'google',
      });
    }
    await this.setRefreshToken({ user, res: context.res });
    return {
      accessToken: await this.setAccessToken({ user, res: context.res }),
    };
  }
}
