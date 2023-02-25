import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './users.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => String)
  getHello() {
    return this.userService.hello();
  }
}
