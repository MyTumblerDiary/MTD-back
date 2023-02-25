import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  //imports: [],
  //controllers:[],
  providers: [UserResolver, UserService],
})
export class UserModule {}
