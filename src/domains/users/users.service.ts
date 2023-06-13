import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserAuth } from '../auth/interfaces/user-auth';
import { CreateUserInput } from './dto/createUsers.input';
import { UpdateUserInput } from './dto/updateUsers.input';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
  ) {}

  async findOne(id: string) {
    return await this.userRepository.findOneOrFail({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneOrFail({ where: { email } });
  }

  async create(createUserInput: CreateUserInput) {
    createUserInput.password = await bcrypt.hash(createUserInput?.password, 10);
    const result = await this.userRepository.save({
      ...createUserInput,
    });
    return result;
  }

  async updateUser(user: UserAuth, updateUserInput: UpdateUserInput) {
    const userInfo = (await this.userRepository.findOne({
      where: { email: user.email },
    })) as User;
    if (updateUserInput.nickname) {
      if (userInfo?.nickname === updateUserInput.nickname) {
        throw new ConflictException(
          '현재 닉네임과 다른 닉네임을 입력해주세요.',
        );
      } else {
        await this.checkNickname(updateUserInput.nickname);
      }
    }
    if (updateUserInput.password && userInfo.password) {
      const isCurrentPasswordValid = bcrypt.compare(
        updateUserInput.currentPassword,
        userInfo?.password,
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
      ...userInfo,
      ...updatedFields,
    };
    return await this.userRepository.save(newUser);
  }

  async deleteUser(user: UserAuth) {
    const result = await this.userRepository.softDelete({ email: user.email });
    return result.affected ? true : false;
  }

  async checkEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다.');
    return true;
  }

  async checkNickname(nickname: string) {
    const user = await this.userRepository.findOne({ where: { nickname } });
    if (user) throw new ConflictException('이미 등록된 닉네임 입니다.');
    return true;
  }

  async resetPassword(userEmail: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (!user) throw new ConflictException('이메일이 존재하지 않습니다.');
    password = await bcrypt.hash(password, 10);
    const newUser = {
      ...user,
      password,
    };
    return await this.userRepository.save(newUser);
  }

  async getUser(user: UserAuth) {
    const userInfo = await this.userRepository.findOne({
      where: { email: user.email },
    });
    return userInfo as User;
  }
}
