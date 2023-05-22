import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmailService } from './email.service';

@Resolver()
export class EmailResolver {
  constructor(
    private readonly emailService: EmailService, //
  ) {}

  @Query(() => Boolean, {
    description: '회원가입 이메일 보내기',
  })
  async createUserEmail(@Args('email') email: string): Promise<boolean> {
    return await this.emailService.createUserSendEmail(email);
  }

  @Query(() => Boolean, {
    description: '이메일인증 코드 확인',
  })
  async checkcode(
    @Args('email') email: string,
    @Args('code') code: string,
  ): Promise<boolean> {
    return await this.emailService.checkCode({ email, code });
  }
}
