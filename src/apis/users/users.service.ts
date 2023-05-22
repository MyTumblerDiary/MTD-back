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
import { EmailService } from '../emails/email.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
    @Inject(CACHE_MANAGER) private cacheManager: Cache, //private readonly emailService: EmailService,
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

  async deleteUser({ userEmail }) {
    const result = await this.userRepository.softDelete({ email: userEmail });
    //return result.affected ? true : false;
    return result;
  }

  async fetchUserPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new ConflictException('존재하지 않는 이메일입니다');
    return 1;
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
