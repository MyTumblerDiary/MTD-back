import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/createUsers.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne({ email }) {
    return await this.userRepository.findOneBy({ email });
  }

  async create({ createUserInput }) {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    const email = createUserInput.email;
    const user = await this.userRepository.findOneBy({ email });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다.');
    const result = await this.userRepository.save({
      email: createUserInput.email,
      password: hashedPassword,
      name: createUserInput.name,
      age: createUserInput.age,
    });
    return result;
  }
}
