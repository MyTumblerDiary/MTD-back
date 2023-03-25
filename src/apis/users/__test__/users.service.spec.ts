import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../users.service';
import * as bcrypt from 'bcrypt';

class MockUserRepository {
  mydb = [
    {
      email: 'a@a.com',
      password: '0000',
      name: '짱구',
      age: 7,
    },
  ];
  findOne({ email }) {
    const users = this.mydb.filter((el) => el.email === email);
    if (users.length) return users[0];
    return null;
  }
  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('UserService', () => {
  let userService: UserService;
  beforeEach(async () => {
    const userModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    userService = userModule.get<UserService>(UserService);
  });

  describe('create', () => {
    it('이미 존재하는 이메일인지 검증하기!!', async () => {
      const myData = {
        createUserInput: {
          email: 'a@a.com',
          password: '1234',
          name: '철수',
          age: 13,
        },
      };
      try {
        await userService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
      userService.create({ ...myData });
    });
    it('회원 등록 잘됐는지 검증!!', async () => {
      const myData = {
        createUserInput: {
          email: 'bbb@bbb.com',
          password: '1234',
          name: '철수',
          age: 13,
        },
      };
      const myResultData = {
        createUserInput: {
          email: 'bbb@bbb.com',
          password: '1234',
          name: '철수',
          age: 13,
        },
      };
      const result = await userService.create({ ...myData });
      expect(result).toStrictEqual(result);
    });
  });

  describe('findOne', () => {});
});
