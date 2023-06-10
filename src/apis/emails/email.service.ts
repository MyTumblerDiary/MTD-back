import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CloudAwsService } from '../clouds/aws/cloud-aws.service';
import { UserService } from '../users/users.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly userService: UserService,
    private readonly cloudAwsService: CloudAwsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async sendEmail(to: string, subject: string, body: string): Promise<string> {
    try {
      await this.cloudAwsService
        .ses()
        .sendEmail({
          Source: 'mytumblerdiary@gmail.com', // SES에서 검증된 이메일 주소
          Destination: {
            ToAddresses: [to],
          },
          Message: {
            Subject: {
              Data: subject,
            },
            Body: {
              Text: {
                Data: body,
              },
            },
          },
        })
        .promise();

      return 'Successfully sent email';
    } catch (error) {
      console.error(error);
      throw new Error('Failed to send email');
    }
  }

  async verifyEmailAddress(email: string): Promise<void> {
    try {
      await this.cloudAwsService
        .ses()
        .verifyEmailIdentity({ EmailAddress: email })
        .promise();
      console.log(`Email address ${email} has been verified.`);
    } catch (error) {
      console.error(
        `Failed to verify email address ${email}. Error: ${error.message}`,
      );
    }
  }

  async createUserSendEmail(email: string): Promise<string> {
    // const user = await this.userService.findOneByEmail(email);
    // if (!user) throw new ConflictException('존재하지 않는 이메일입니다');
    await this.verifyEmailAddress(email);
    const getRandomCode = (min: number, max: number) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };

    const randomCode = getRandomCode(111111, 999999);
    const subject = 'MTD 인증메일입니다.';

    if (randomCode) {
      await this.cacheManager.get(`${email}'s AuthenticationCode`);
    }
    await this.cacheManager.set(`${email}'s AuthenticationCode`, randomCode);

    const sendResult = await this.sendEmail(
      email,
      subject,
      randomCode.toString(),
    );
    return sendResult;
  }

  async checkCode({
    email,
    code,
  }: {
    email: string;
    code: string;
  }): Promise<boolean> {
    const chk = await this.cacheManager.get(`${email}'s AuthenticationCode`);
    if (chk != code) throw new ConflictException('코드가 맞지 않습니다.');
    return true;
  }

  async resetPassword({ email }: { email: string }): Promise<string> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.social !== 'local')
      throw new ConflictException(
        '소셜 로그인 유저는 비밀번호를 변경할 수 없습니다.',
      );
    return this.createUserSendEmail(email);
  }
}
