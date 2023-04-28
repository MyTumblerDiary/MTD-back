import { CacheModule } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserResolver } from '../users.resolver';
import { UserService } from '../users.service';
import { MockUserRepository } from './users.service.spec';
import * as bcrypt from 'bcrypt';

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;
  beforeEach(async () => {
    const userModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        UserResolver,
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    userResolver = userModule.get<UserResolver>(UserResolver);
    userService = userModule.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      // 1. 테스트 데이터를 설정합니다.
      const input = {
        email: 'test@example.com',
        password: 'password',
        nickname: 'testuser',
      };
      const originPW = input.password;
      // 2. Resolver 함수를 호출합니다.
      const createdUser = await userResolver.createUser(input);

      // 3. 반환된 데이터를 테스트합니다.
      expect(createdUser.email).toEqual(input.email);

      const isMatched = await bcrypt.compare(originPW, createdUser.password);
      expect(isMatched).toBeTruthy();
      expect(createdUser.nickname).toEqual(input.nickname);
    });
  });
});
