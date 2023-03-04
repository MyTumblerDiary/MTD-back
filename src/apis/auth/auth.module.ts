import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/users.service';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User]),
  ],

  providers: [
    JwtRefreshStrategy,
    AuthResolver, //
    AuthService,
    UserService,
  ],
})
export class AuthModule {}
