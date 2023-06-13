// import { CacheModule } from '@nestjs/common';
// import { Test } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import * as bcrypt from 'bcrypt';
// import { User } from '../entities/user.entity';
// import { UserService } from '../users.service';

// export class MockUserRepository {
//   mydb = [
//     {
//       email: 'a@a.com',
//       password: '0000',
//       nickname: '짱구',
//       deletedAt: null,
//     },
//   ];
//   findOne({ email }) {
//     const users = this.mydb.filter(
//       (el) => el.email === email && el.deletedAt === null,
//     ); // soft delete를 적용하여 삭제된 유저는 조회되지 않도록 수정
//     if (users.length) return users[0];
//     return null;
//   }
//   save({ email, password, nickname }) {
//     this.mydb.push({ email, password, nickname, deletedAt: null });
//     return { email, password, nickname };
//   }
//   softDelete({ email }) {
//     const userIndex = this.mydb.findIndex(
//       (el) => el.email === email && el.deletedAt === null,
//     ); // soft delete를 적용하여 삭제된 유저는 삭제되지 않도록 수정
//     if (userIndex === -1) return false;

//     this.mydb[userIndex].deletedAt = new Date(); // soft delete를 적용하여 deletedAt 속성을 현재 시간으로 설정
//     return true;
//   }
// }

// describe('UserService', () => {
//   let userService: UserService;
//   beforeEach(async () => {
//     const userModule = await Test.createTestingModule({
//       imports: [CacheModule.register()],
//       providers: [
//         UserService,
//         {
//           provide: getRepositoryToken(User),
//           useClass: MockUserRepository,
//         },
//       ],
//     }).compile();

//     userService = userModule.get<UserService>(UserService);
//   });

//   describe('create', () => {
//     it('이미 존재하는 이메일인지 검증하기!!', async () => {
//       const myData = {
//         createUserInput: {
//           email: 'a@a.com',
//           password: '1234',
//           nickname: '철수',
//         },
//       };
//       const result = await userService.checkEmail({
//         email: myData.createUserInput.email,
//       });
//       expect(result).toBeTruthy();
//     });
//     it('회원 등록 잘됐는지 검증!!', async () => {
//       const myData = {
//         createUserInput: {
//           email: 'bbb@bbb.com',
//           password: '1234',
//           nickname: '철수',
//         },
//       };
//       const originPW = myData.createUserInput.password;
//       const result = await userService.create({ ...myData });
//       expect(result.email).toBe(myData.createUserInput.email);
//       expect(result.nickname).toBe(myData.createUserInput.nickname);
//       const isMatched = await bcrypt.compare(originPW, result.password);
//       expect(isMatched).toBeTruthy();
//     });
//   });

//   describe('update', () => {
//     it('유효한 유저 email을 입력받아서 해당 유저의 정보를 수정하는지 확인', async () => {
//       const createUserInput = {
//         email: 'test@test.com',
//         password: 'test1234',
//         nickname: 'testuser',
//       };

//       // 1. 테스트용 유저 생성
//       await userService.create({
//         createUserInput,
//       });

//       // 2. 변경할 유저 정보
//       const updatedUserData = {
//         email: 'test@test.com',
//         password: 'test5678',
//         nickname: 'testuser_updated',
//       };
//       const updatePW = updatedUserData.password;
//       // 3. update 메서드 호출
//       const updatedUser = await userService.updateUser(

//       )

//       // 4. 반환된 유저 정보가 변경된 정보와 일치하는지 확인
//       expect(updatedUser.nickname).toBe(updatedUserData.nickname);

//       // 5. bcrypt.compare 메서드를 사용해서 비밀번호를 검증
//       const isMatched = await bcrypt.compare(updatePW, updatedUser.password);
//       expect(isMatched).toBeTruthy();
//     });
//   });

//   describe('deleteUser', () => {
//     it('유저가 성공적으로 삭제되는지 확인', async () => {
//       // 새로운 유저 생성
//       const createUserInput = {
//         email: 'test@example.com',
//         password: 'password',
//         nickname: 'testuser',
//       };
//       const createdUser = await userService.create({
//         createUserInput,
//       });

//       // 유저 삭제
//       const result = await userService.deleteUser({
//         userEmail: createdUser.email,
//       });
//       expect(result).toBe(true);

//       // 유저가 실제로 삭제되었는지 확인
//       const deletedUser = await userService.findOneByEmail(createdUser.email);
//       expect(deletedUser).toBeNull();
//     });

//     it('유저가 이미 삭제된 경우 false 반환', async () => {
//       // 새로운 유저 생성
//       const createUserInput = {
//         email: 'test@example.com',
//         password: 'password',
//         nickname: 'testuser',
//       };
//       const createdUser = await userService.create({
//         createUserInput,
//       });

//       // 유저 삭제
//       const result1 = await userService.deleteUser({
//         userEmail: createdUser.email,
//       });
//       expect(result1).toBe(true);

//       // 이미 삭제된 유저 삭제 시도
//       const result2 = await userService.deleteUser({
//         userEmail: createdUser.email,
//       });
//       expect(result2).toBe(false);
//     });
//   });
// });
