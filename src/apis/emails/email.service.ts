import * as aws from '@aws-sdk/client-ses';
import * as nodemailer from 'nodemailer';
import { Cache } from 'cache-manager';
import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { SES } from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailService {
  private readonly ses: SES;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.ses = new SES({
      region: process.env.AWS_SES_API_REGION,
      accessKeyId: process.env.AWS_SES_API_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SES_API_SECRET_ACCESS_KEY,
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<string> {
    try {
      await this.ses
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

  async verifyEmailAddress(email: string) {
    try {
      await this.ses.verifyEmailIdentity({ EmailAddress: email }).promise();
      console.log(`Email address ${email} has been verified.`);
    } catch (error) {
      console.error(
        `Failed to verify email address ${email}. Error: ${error.message}`,
      );
    }
  }

  async createUserSendEmail(email: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new ConflictException('존재하지 않는 이메일입니다');
    await this.verifyEmailAddress(email);
    const getRandomCode = (min, max) => {
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

  async checkCode({ email, code }) {
    const chk = await this.cacheManager.get(`${email}'s AuthenticationCode`);
    if (chk != code) throw new ConflictException('코드가 맞지 않습니다.');
    return true;
  }
}
