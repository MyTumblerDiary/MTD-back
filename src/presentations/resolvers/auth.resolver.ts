import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { UserAuth } from 'src/applications/auth/interfaces/user-auth';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/infrastructures/auth/gql-auth.guard';
import {
  CurrentToken,
  CurrentUser,
} from 'src/infrastructures/auth/gql-user.param';
import { AuthService } from '../../applications/auth/auth.service';
import { LoginResponseDto } from '../../applications/auth/dto/auth.output.dto';
import { LoginInputDto } from '../../applications/auth/dto/login.input.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponseDto, {
    description: '로컬 로그인',
  })
  async login(
    @Args('loginInput') loginInput: LoginInputDto,
    @Context('res') res: Response,
  ): Promise<LoginResponseDto> {
    const tokens = this.authService.loginUser(loginInput, res);
    return tokens;
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String, {
    description: 'accesstoken 재발급',
  })
  restoreAccessToken(@CurrentUser('user') user: UserAuth): Promise<string> {
    return this.authService.setAccessToken(user);
  }

  @Mutation(() => LoginResponseDto, {
    description: '인가코드로 카카오 accesstoken 발급후 로그인',
  })
  async kakaoLogin(
    @Args('code') code: string,
    @Context('res') res: Response,
  ): Promise<LoginResponseDto> {
    const accessToken = await this.authService.getKakaoAccessToken(code);
    return await this.authService.kakaoLogin(accessToken, res);
  }

  @Mutation(() => LoginResponseDto, {
    description: '인가코드로 구글 accesstoken 발급후 로그인',
  })
  async googleLogin(
    @Args('code') code: string,
    @Context('res') res: Response,
  ): Promise<LoginResponseDto> {
    const accessToken = await this.authService.getGoogleAccessToken(code);
    return await this.authService.googleLogin(accessToken, res);
  }

  @Mutation(() => LoginResponseDto, {
    description: 'apple 인가코드로 accesstoken 발급',
  })
  async appleLogin(
    @Args('code') code: string,
    @Context('res') res: Response,
  ): Promise<LoginResponseDto> {
    const idToken = await this.authService.getAppleAccessToken(code);
    return await this.authService.appleLogin(idToken, res);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String, {
    description: '로그아웃',
  })
  async logout(@CurrentToken('req') req: Request): Promise<string> {
    return await this.authService.logout(req);
  }
}
