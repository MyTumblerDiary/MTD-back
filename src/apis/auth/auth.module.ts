import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/commons/auth/strategies/jwt-refresh.strategy';
import { UserModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { RefreshToken } from './entities/refreshToken.entity';
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt-access' }),
    JwtModule.registerAsync({
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
