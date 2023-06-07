import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/apis/users/entities/user.entity';
import { AccessTokenPayload } from '../access-token.payload';
import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_SECRET_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: AccessTokenPayload): Promise<User> {
    const accessToken = req.rawHeaders
      .filter((ele) => {
        return ele.match(/Bearer/);
      })[0]
      .split(' ')[1];
    const check = await this.cacheManager.get(accessToken);

    if (check) throw new UnauthorizedException();
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
