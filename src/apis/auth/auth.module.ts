import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/commons/auth/strategies/jwt-refresh.strategy';
import { JwtGoogleStrategy } from 'src/commons/auth/strategies/jwt-social-google.strategy';
import { JwtKakaoStrategy } from 'src/commons/auth/strategies/jwt-social-kakao.strategy';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/users.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt-access' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_SECRET_KEY'),
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],

  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtKakaoStrategy,
    AuthResolver,
    AuthService,
    UserService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
