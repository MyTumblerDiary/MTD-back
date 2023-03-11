import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtRefreshStrategy } from 'src/commons/auth/strategies/jwt-refresh.strategy';
import { JwtGoogleStrategy } from 'src/commons/auth/strategies/jwt-social-google.strategy';
import { JwtKakaoStrategy } from 'src/commons/auth/strategies/jwt-social-kakao.strategy';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User]),
  ],

  providers: [
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtKakaoStrategy,
    AuthResolver, //
    AuthService,
    UserService,
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
