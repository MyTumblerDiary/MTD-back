import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
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
    return await this.userService.create({ createUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User, {
    description: '유저정보 수정',
  })
  async updateUser(
    @Args('userEmail') userEmail: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.updateUser({ userEmail, updateUserInput });
  }

  @Mutation(() => Boolean, {
    description: '유저정보 삭제',
  })
  deleteUser(@Args('userEmail') userEmail: string) {
    return this.userService.deleteUser({ userEmail });
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
