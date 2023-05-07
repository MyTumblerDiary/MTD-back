import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
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

  @Query(() => String, {
    description: '인가코드로 카카오 accesstoken 발급',
  })
  async getKakaoAccessToken(@Args('code') code: string) {
    return await this.authService.getKakaoAccessToken(code);
  }

  @Mutation(() => String, {
    description: '카카오 accessToken으로 로그인',
  })
  async kakaoLogin(
    @Args('accessToken') accessToken: string, //
    @Context() context: any,
  ) {
    return await this.authService.kakaoLogin({ accessToken, context });
  }
}
