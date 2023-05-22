import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../../apis/auth/auth.service';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_SECRET_KEY,
      passReqToCallback: true,
    });
  }
  async validate(req, payload) {
    const { email, sub } = payload;
    const refreshToken = req.rawHeaders
      .filter((ele) => {
        return ele.match(/Bearer/);
      })[0]
      .split(' ')[1];

    const check = await this.cacheManager.get(refreshToken);

    if (check) throw new UnauthorizedException();

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
