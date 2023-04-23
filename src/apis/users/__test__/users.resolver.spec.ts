import { Test } from '@nestjs/testing';
import { UserResolver } from '../users.resolver';
import { UserService } from '../users.service';

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;
  beforeEach(async () => {
    const userModule = await Test.createTestingModule({
      providers: [UserResolver, UserService],
    }).compile();

    userResolver = userModule.get<UserResolver>(UserResolver);
  });

  // describe('createUser', () => {
  //   it('create', () => {
  //     const result = userResolver.createUser();
  //     expect(result).toBe('');
  //   });
  // });
});
