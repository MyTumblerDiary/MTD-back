import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../../domains/auth/auth.service';
import { RefreshTokenPayload } from '../refresh-token.payload';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_SECRET_KEY,
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload: RefreshTokenPayload) {
    const { email, sub } = payload;
    const refreshToken = req.rawHeaders
      .filter((ele) => {
        return ele.match(/Bearer/);
      })[0]
      .split(' ')[1];
    const storedRefreshToken = await this.authService.findRefreshTokenByUserId(
      sub,
    );
    if (
      !refreshToken ||
      !(await this.compareRefreshTokens(
        refreshToken,
        storedRefreshToken.refreshToken,
      ))
    ) {
      throw new UnauthorizedException();
    }
    return {
      email,
      sub,
    };
  }
  async compareRefreshTokens(
    plainToken: string,
    hashedToken: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainToken, hashedToken);
  }
}
