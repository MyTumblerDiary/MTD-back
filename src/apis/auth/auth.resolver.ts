import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { AuthService } from './auth.service';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Mutation(() => String, {
    description: '로컬 로그인',
  })
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: any,
  ) {
    return this.authService.loginUser({ email, password, context });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String, {
    description: 'accesstoken 재발급',
  })
  restoreAccessToken(
    @CurrentUser() currentUser: any, //
    res: Response,
  ) {
    return this.authService.setAccessToken({ user: currentUser, res });
  }

  @Mutation(() => String, {
    description: '인가코드로 카카오 accesstoken 발급후 로그인',
  })
  async kakaoLogin(
    @Args('code') code: string, //
    @Context() context: any,
  ) {
    const accessToken = await this.authService.getKakaoAccessToken(code);
    return await this.authService.kakaoLogin({ accessToken, context });
  }
}
