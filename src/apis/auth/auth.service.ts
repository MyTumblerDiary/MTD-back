import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import * as qs from 'qs';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/users.service';
import { RefreshToken } from './entities/refreshToken.entity';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';
import AppleSignIn from 'apple-signin-auth';
import { JwtPayload } from 'jsonwebtoken';
import { LoginResponseDto } from './dto/auth.output.dto';
import { LoginInputDto } from './dto/login.input.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshtokenRepository: Repository<RefreshToken>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findRefreshTokenByUserId(
    userId: string,
  ): Promise<RefreshToken | undefined> {
    return this.refreshtokenRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  async setRefreshToken({ user }): Promise<string> {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: process.env.REFRESH_SECRET_KEY, expiresIn: '2w' },
    );
    const hashedRefreshToken = await bcrypt.hash(refreshToken.toString(), 10);
    const existingRefreshToken = await this.refreshtokenRepository.findOne({
      where: { user: { id: user.id } },
    });
    if (existingRefreshToken) {
      existingRefreshToken.refreshToken = hashedRefreshToken;
      await this.refreshtokenRepository.save(existingRefreshToken);
    } else {
      await this.refreshtokenRepository.save({
        refreshToken: hashedRefreshToken,
        user,
      });
    }
    return refreshToken;
  }
  async setAccessToken({ user }): Promise<string> {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: process.env.ACCESS_SECRET_KEY, expiresIn: '1h' },
    );
    return accessToken;
  }

  async loginUser(loginInputDto: LoginInputDto): Promise<LoginResponseDto> {
    const { email, password } = loginInputDto;
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnprocessableEntityException(
        '해당 이메일이 등록되어 있지 않습니다.',
      );
    }
    if (user.social !== 'local')
      throw new UnprocessableEntityException(
        `${user.social} 소셜로그인한 이메일입니다.`,
      );
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 틀렸습니다.');
    return {
      accessToken: await this.setAccessToken({ user }),
      refreshToken: await this.setRefreshToken({ user }),
    };
  }

  async getKakaoAccessToken(code: string): Promise<string> {
    const token = await axios({
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

  async getUserByKakaoAccessToken(accessToken: string): Promise<any> {
    const result = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = result.data;
    return data;
  }

  async kakaoLogin(accessToken: string): Promise<LoginResponseDto> {
    const profile = await this.getUserByKakaoAccessToken(accessToken);
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
    return {
      accessToken: await this.setAccessToken({ user }),
      refreshToken: await this.setRefreshToken({ user }),
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

  async getUserByGoogleAccessToken(accessToken: string): Promise<any> {
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

  async googleLogin(accessToken: string): Promise<LoginResponseDto> {
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
    return {
      accessToken: await this.setAccessToken({ user }),
      refreshToken: await this.setRefreshToken({ user }),
    };
  }

  async logout({ context }): Promise<string> {
    const accessToken = context.req.headers.authorization.replace(
      'Bearer ',
      '',
    );
    try {
      jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
      //jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    } catch (error) {
      throw new UnauthorizedException();
    }

    await this.cacheManager.set(accessToken, 'accessToken', { ttl: 120 });
    // await this.cacheManager.set(refreshToken, 'refreshToken', { ttl: 120 });

    return '로그아웃에 성공했습니다';
  }

  async getAppleAccessToken(code: string): Promise<string> {
    const clientSecret = AppleSignIn.getClientSecret({
      clientID: process.env.OAUTH_APPLE_CLIENT_ID,
      teamID: process.env.OAUTH_APPLE_TEAM_ID,
      privateKeyPath: process.env.OAUTH_APPLE_SECRETKRY_PATH,
      keyIdentifier: process.env.OAUTH_APPLE_KEY_ID,
    });
    const options = {
      clientID: process.env.OAUTH_APPLE_CLIENT_ID,
      redirectUri: process.env.OAUTH_APPLE_REDIRECT_URI,
      clientSecret: clientSecret,
    };
    const tokenResponse = await AppleSignIn.getAuthorizationToken(
      code,
      options,
    );
    return tokenResponse.id_token;
  }

  async appleLogin(idToken: string): Promise<LoginResponseDto> {
    const decodedToken = jwt.decode(idToken) as JwtPayload;
    let user = await this.userService.findOneByEmail(decodedToken.email);
    const hashedPassword = await bcrypt.hash(decodedToken.sub.toString(), 10);
    if (user && user.social !== 'apple') {
      const errorMessage = `${user.email} 이메일로 이미 가입된 계정이 있습니다.`;
      throw new UnprocessableEntityException(errorMessage, user.email);
    } else if (!user) {
      user = await this.userRepository.save({
        email: decodedToken.email,
        password: hashedPassword,
        nickname: decodedToken.email.split('@')[0],
        social: 'apple',
      });
    }

    return {
      accessToken: await this.setAccessToken({ user }),
      refreshToken: await this.setRefreshToken({ user }),
    };
  }
}
