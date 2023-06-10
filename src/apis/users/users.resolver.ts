import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { CreateUserInput } from './dto/createUsers.input';
import { UpdateUserInput } from './dto/updateUsers.input';
@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Mutation(() => User, {
    description: '회원가입',
  })
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User, {
    description: '유저정보 수정',
  })
  async updateUser(
    @CurrentUser('user') user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.updateUser(user, updateUserInput);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean, {
    description: '유저정보 삭제',
  })
  deleteUser(@CurrentUser('user') user: User) {
    return this.userService.deleteUser(user);
  }

  @Query(() => Boolean, {
    description: '중복 이메일 확인',
  })
  async checkEmail(@Args('email') email: string): Promise<boolean> {
    return await this.userService.checkEmail(email);
  }

  @Query(() => Boolean, {
    description: '닉네임 중복 확인',
  })
  async checkNickname(@Args('nickname') nickname: string): Promise<boolean> {
    return await this.userService.checkNickname(nickname);
  }

  @Mutation(() => User, {
    description: '이메일 인증후 비밀번호 수정하기',
  })
  async resetPassword(
    @Args('userEmail') userEmail: string,
    @Args('password') password: string,
  ) {
    return await this.userService.resetPassword(userEmail, password);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User, {
    description: '유저 정보 가져오기',
  })
  async user(@CurrentUser('user') user: User): Promise<User> {
    return await this.userService.getUser(user);
  }
}
