import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAccessStrategy } from 'src/infrastructures/common/auth/strategies/jwt-access.strategy';
import { UserResolver } from 'src/presentations/resolvers/users.resolver';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [JwtAccessStrategy, UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
