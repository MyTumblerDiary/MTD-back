import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { AuthService } from './auth.service';
import axios from 'axios';
import * as qs from 'qs';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: any,
  ) {
    return this.authService.loginUser({ email, password, context });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @CurrentUser() currentUser: any, //
    res: Response,
  ) {
    return this.authService.setAccessToken({ user: currentUser, res });
  }

  @Query(() => String)
  async getKakaoAccessToken(@Args('code') code: string) {
    const accessToken = await this.authService.getKakaoAccessToken(code);
    return accessToken;
  }

  @Mutation(() => String)
  async kakaoLogin(
    @Args('accessToken') accessToken: string, //
    @Context() context: any,
  ) {
    const user = await this.authService.kakaoLogin({ accessToken, context });
    return user;
  }
}
