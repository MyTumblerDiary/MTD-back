import { CacheModule, ConflictException, CACHE_MANAGER } from '@nestjs/common';
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
      nickname: '짱구',
    },
  ];
  findOne({ email }) {
    const users = this.mydb.filter((el) => el.email === email);
    if (users.length) return users[0];
    return null;
  }
  save({ email, password, nickname }) {
    this.mydb.push({ email, password, nickname });
    return { email, password, nickname };
  }
}

describe('UserService', () => {
  let userService: UserService;
  beforeEach(async () => {
    const userModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
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
          nickname: '철수',
        },
      };
      const result = await userService.checkEmail({
        email: myData.createUserInput.email,
      });
      expect(result).toBeTruthy();
    });
    it('회원 등록 잘됐는지 검증!!', async () => {
      const myData = {
        createUserInput: {
          email: 'bbb@bbb.com',
          password: '1234',
          nickname: '철수',
        },
      };
      const originPW = myData.createUserInput.password;
      const result = await userService.create({ ...myData });
      expect(result.email).toBe(myData.createUserInput.email);
      expect(result.nickname).toBe(myData.createUserInput.nickname);
      const isMatched = await bcrypt.compare(originPW, result.password);
      expect(isMatched).toBeTruthy();
    });
  });

  describe('update', () => {
    it('유효한 유저 email을 입력받아서 해당 유저의 정보를 수정하는지 확인', async () => {
      const createUserInput = {
        email: 'test@test.com',
        password: 'test1234',
        nickname: 'testuser',
      };

      // 1. 테스트용 유저 생성
      const createdUser = await userService.create({
        createUserInput,
      });

      // 2. 변경할 유저 정보
      const updatedUserData = {
        email: 'test@test.com',
        password: 'test5678',
        nickname: 'testuser_updated',
      };
      const updatePW = updatedUserData.password;
      // 3. update 메서드 호출
      const updatedUser = await userService.updateUser({
        userEmail: createUserInput.email,
        updateUserInput: updatedUserData,
      });

      // 4. 반환된 유저 정보가 변경된 정보와 일치하는지 확인
      expect(updatedUser.nickname).toBe(updatedUserData.nickname);

      // 5. bcrypt.compare 메서드를 사용해서 비밀번호를 검증
      console.log(updatePW);
      console.log(updatedUser.password);
      const isMatched = await bcrypt.compare(updatePW, updatedUser.password);
      expect(isMatched).toBeTruthy();
    });
  });
});
