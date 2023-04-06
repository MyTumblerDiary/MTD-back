import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { CreateUserInput } from './dto/createUsers.input';
@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create({ createUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUser(
    @CurrentUser() currentUser: User, //
  ) {
    console.log('fetchUser 실행완료');
    console.log('유저정보:', currentUser);
    return 'qqq';
  }

  @Query(() => Boolean)
  async sendEmail(@Args('id') id: string): Promise<boolean> {
    return await this.userService.sendEmail(id);
  }

  @Query(() => Boolean)
  async checkcode(
    @Args('email') email: string,
    @Args('code') code: string,
  ): Promise<boolean> {
    return await this.userService.checkCode({ email, code });
  }
}
