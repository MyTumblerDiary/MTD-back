import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import * as nodemailer from 'nodemailer';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create({ createUserInput }) {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);
    const result = await this.userRepository.save({
      ...createUserInput,
    });
    return result;
  }

  async updateUser({ userEmail, updateUserInput }) {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    updateUserInput.password = await bcrypt.hash(updateUserInput.password, 10);
    const newUser = {
      ...user,
      email: userEmail,
      ...updateUserInput,
    };
    return await this.userRepository.save(newUser);
  }

  async deleteUser({ userId }) {
    const result = await this.userRepository.softDelete({ id: userId });
    return result.affected ? true : false;
  }

  async fetchUserPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new ConflictException('존재하지 않는 이메일입니다');
    return 1;
  }

  async sendEmail(email: string): Promise<boolean> {
    //const user = await this.userRepository.findOne({ where: { id } });

    const getRandomCode = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };

    const randomCode = getRandomCode(111111, 999999);

    const transport = nodemailer.createTransport({
      service: 'Gmail',
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_ID,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
    });

    if (randomCode) {
      await this.cacheManager.get(`${email}'s AuthenticationCode`);
    }
    await this.cacheManager.set(`${email}'s AuthenticationCode`, randomCode);

    const sendResult = await transport.sendMail({
      from: {
        name: '인증관리자',
        address: process.env.GMAIL_ID,
      },
      subject: '내 서비스 인증 메일',
      to: [email],
      text: `The Authentication code is ${randomCode}`,
    });
    return sendResult.accepted.length > 0;
  }

  async checkCode({ email, code }) {
    const chk = await this.cacheManager.get(`${email}'s AuthenticationCode`);
    if (chk != code) throw new ConflictException('코드가 맞지 않습니다.');
    return true;
  }

  async checkEmail({ email }) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다.');
    return true;
  }

  async checkNickname({ nickname }) {
    const user = await this.userRepository.findOne({ where: { nickname } });
    if (user) throw new ConflictException('이미 등록된 닉네임 입니다.');
    return true;
  }
}
