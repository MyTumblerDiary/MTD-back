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
    if (updateUserInput.nickname) {
      const isNicknameAvailable = await this.checkNickname({
        nickname: updateUserInput.nickname,
      });

      if (!isNicknameAvailable) {
        throw new ConflictException('이미 등록된 닉네임입니다.');
      }
    }

    if (updateUserInput.password) {
      const isCurrentPasswordValid = await bcrypt.compare(
        updateUserInput.currentPassword,
        user.password,
      );

      if (!isCurrentPasswordValid) {
        throw new ConflictException('현재 비밀번호가 올바르지 않습니다.');
      } else if (updateUserInput.password === updateUserInput.currentPassword) {
        throw new ConflictException(
          '현재 비밀번호와 다른 비밀번호를 입력해주세요.',
        );
      }

      updateUserInput.password = await bcrypt.hash(
        updateUserInput.password,
        10,
      );
    }
    const { currentPassword, ...updatedFields } = updateUserInput;
    const newUser = {
      ...user,
      ...updatedFields,
    };
    return await this.userRepository.save(newUser);
  }

  async deleteUser({ userEmail }) {
    const result = await this.userRepository.softDelete({ email: userEmail });
    //return result.affected ? true : false;
    return result;
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
