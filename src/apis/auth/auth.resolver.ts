import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import { CurrentToken, CurrentUser } from 'src/commons/auth/gql-user.param';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/auth.output.dto';
import { LoginInputDto } from './dto/login.input.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponseDto, {
    description: '로컬 로그인',
  })
  async login(
    @Args('loginInput') loginInput: LoginInputDto,
  ): Promise<LoginResponseDto> {
    return this.authService.loginUser(loginInput);
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String, {
    description: 'accesstoken 재발급',
  })
  restoreAccessToken(@CurrentUser('user') user: User): Promise<string> {
    return this.authService.setAccessToken(user);
  }

  @Mutation(() => LoginResponseDto, {
    description: '인가코드로 카카오 accesstoken 발급후 로그인',
  })
  async kakaoLogin(@Args('code') code: string): Promise<LoginResponseDto> {
    const accessToken = await this.authService.getKakaoAccessToken(code);
    return await this.authService.kakaoLogin(accessToken);
  }

  @Mutation(() => LoginResponseDto, {
    description: '인가코드로 구글 accesstoken 발급후 로그인',
  })
  async googleLogin(@Args('code') code: string): Promise<LoginResponseDto> {
    const accessToken = await this.authService.getGoogleAccessToken(code);
    return await this.authService.googleLogin(accessToken);
  }

  @Mutation(() => LoginResponseDto, {
    description: 'apple 인가코드로 accesstoken 발급',
  })
  async appleLogin(@Args('code') code: string): Promise<LoginResponseDto> {
    const idToken = await this.authService.getAppleAccessToken(code);
    return await this.authService.appleLogin(idToken);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String, {
    description: '로그아웃',
  })
  async logout(@CurrentToken('req') req: Request): Promise<string> {
    return await this.authService.logout(req);
  }
}
