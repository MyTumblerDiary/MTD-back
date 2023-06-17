import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAccessStrategy } from 'src/infrastructures/auth/strategies/jwt-access.strategy';
import { UserResolver } from 'src/presentations/resolvers/users.resolver';
import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { RefreshToken } from '../auth/entities/refreshToken.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  providers: [JwtAccessStrategy, UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
