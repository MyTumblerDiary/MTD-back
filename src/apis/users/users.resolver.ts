import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { CreateUserInput } from './dto/createUsers.input';
import { UpdateUserInput } from './dto/updateUsers.input';
@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Mutation(() => User, {
    description: '회원가입',
  })
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create({ createUserInput });
  }

  //@UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User, {
    description: '유저정보 수정',
  })
  async updateUser(
    @Args('userEmail') userEmail: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.updateUser({ userEmail, updateUserInput });
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('userId') userId: string) {
    this.userService.deleteUser({ userId });
  }

  @Query(() => Boolean, {
    description: '이메일 보내기',
  })
  async sendEmail(@Args('email') email: string): Promise<boolean> {
    return await this.userService.sendEmail(email);
  }

  @Query(() => Boolean, {
    description: '이메일인증 코드 확인',
  })
  async checkcode(
    @Args('email') email: string,
    @Args('code') code: string,
  ): Promise<boolean> {
    return await this.userService.checkCode({ email, code });
  }

  @Query(() => Boolean, {
    description: '중복 이메일 확인',
  })
  async checkEmail(@Args('email') email: string): Promise<boolean> {
    return await this.userService.checkEmail({ email });
  }

  @Query(() => Boolean, {
    description: '닉네임 중복 확인',
  })
  async checkNickname(@Args('nickname') nickname: string): Promise<boolean> {
    return await this.userService.checkNickname({ nickname });
  }
}
