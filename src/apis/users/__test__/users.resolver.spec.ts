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

  describe('updateUser', () => {
    it('should update a user', async () => {
      // 1. 테스트 데이터를 설정합니다.
      const input = {
        email: 'test@test.com',
        password: 'test1234',
        nickname: 'testuser',
      };
      await userResolver.createUser(input);

      const updateInput = {
        email: 'test@test.com',
        password: 'test5678',
        nickname: 'testuser_updated',
      };
      const updatePW = updateInput.password;
      // 2. UserService의 updateUser 메서드를 호출합니다.
      const updatedUser = await userResolver.updateUser(
        updateInput.email,
        updateInput,
      );

      // 3. 반환된 데이터를 테스트합니다.
      const isMatched = await bcrypt.compare(updatePW, updatedUser.password);
      expect(isMatched).toBeTruthy();
      expect(updatedUser.nickname).toEqual(updateInput.nickname);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      // 1. 테스트 데이터를 설정합니다.
      const input = {
        email: 'test@test.com',
        password: 'test1234',
        nickname: 'testuser',
      };
      const createdUser = await userResolver.createUser(input);

      // 2. Resolver 함수를 호출합니다.
      const result = await userResolver.deleteUser(createdUser.email);

      // 3. 반환된 데이터를 테스트합니다.
      expect(result).toBe(true);
    });
  });
});
