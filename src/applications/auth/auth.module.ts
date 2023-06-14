import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAccessStrategy } from 'src/infrastructures/common/auth/strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/infrastructures/common/auth/strategies/jwt-refresh.strategy';
import { EnvConfigModule } from 'src/infrastructures/env-config/env-config.module';
import { AuthResolver } from '../../presentations/resolvers/auth.resolver';
import { UserModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { RefreshToken } from './entities/refreshToken.entity';
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt-access' }),
    JwtModule.registerAsync({
      imports: [EnvConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_SECRET_KEY'),
      }),
    }),
    TypeOrmModule.forFeature([RefreshToken]),
  ],

  providers: [JwtAccessStrategy, JwtRefreshStrategy, AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
