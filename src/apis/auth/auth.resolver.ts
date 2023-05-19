import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/auth.output.dto';
import { LogoutInput } from './dto/logout.auth.dto';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
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

  @Mutation(() => String, {
    description: '로그아웃',
  })
  async logout(@Args('logoutInput') logoutInput: LogoutInput): Promise<string> {
    return await this.authService.logout(logoutInput);
  }
}
