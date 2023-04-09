import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { AuthService } from './auth.service';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
  ) { }

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
    res: Response
  ) {
    return this.authService.setAccessToken({ user: currentUser, res });
  }
}
