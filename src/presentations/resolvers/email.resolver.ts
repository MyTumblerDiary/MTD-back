import { Args, Query, Resolver } from '@nestjs/graphql';
import { EmailService } from 'src/domains/emails/email.service';

@Resolver()
export class EmailResolver {
  constructor(
    private readonly emailService: EmailService, //
  ) {}

  @Query(() => String, {
    description: '이메일 인증코드 보내기',
  })
  async createUserEmail(@Args('email') email: string): Promise<string> {
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

  @Query(() => String, {
    description: '비밀번호 재설정 이메일 보내기',
  })
  async resetPasswordEmail(@Args('email') email: string): Promise<string> {
    return await this.emailService.resetPassword({ email });
  }
}
