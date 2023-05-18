import {
  CACHE_MANAGER,
  Inject,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/auth.output.dto';
import jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Mutation(() => LoginResponseDto, {
    description: '로컬 로그인',
  })
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: any,
  ): Promise<LoginResponseDto> {
    return this.authService.loginUser({ email, password, context });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String, {
    description: 'accesstoken 재발급',
  })
  restoreAccessToken(
    @CurrentUser() currentUser: any, //
    @Context() context: any,
  ): Promise<string> {
    return this.authService.setAccessToken({
      user: currentUser,
      res: context.res,
    });
  }

  @Mutation(() => LoginResponseDto, {
    description: '인가코드로 카카오 accesstoken 발급후 로그인',
  })
  async kakaoLogin(
    @Args('code') code: string, //
    @Context() context: any,
  ): Promise<LoginResponseDto> {
    const accessToken = await this.authService.getKakaoAccessToken(code);
    return await this.authService.kakaoLogin({ accessToken, context });
  }

  @Mutation(() => LoginResponseDto, {
    description: '인가코드로 구글 accesstoken 발급후 로그인',
  })
  async googleLogin(
    @Args('code') code: string, //
    @Context() context: any,
  ): Promise<LoginResponseDto> {
    const accessToken = await this.authService.getGoogleAccessToken(code);
    return await this.authService.googleLogin({ accessToken, context });
  }

  @Mutation(() => String)
  async logout(@Context() context: any) {
    const access = context.req.rawHeaders
      .filter((ele) => {
        return ele.match(/Bearer/);
      })[0]
      .split(' ')[1];
    console.log('access:', access);

    const refresh = context.req.rawHeaders
      .filter((ele) => {
        return ele.match(/Bearer/);
      })[0]
      .split(' ')[2];
    console.log('refresh:', refresh);

    // try {
    //   jwt.verify(access, process.env.ACCESS_SECRET_KEY);
    //   jwt.verify(refresh, process.env.REFRESH_SECRET_KEY);
    // } catch {
    //   throw new UnauthorizedException();
    // }

    await this.cacheManager.set(access, 'accessToken', { ttl: 120 });
    await this.cacheManager.set(refresh, 'refreshToken', { ttl: 120 });

    return '로그아웃에 성공했습니다';
  }
}
