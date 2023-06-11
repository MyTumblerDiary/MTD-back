import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/applications/users/entities/user.entity';
import { AccessTokenPayload } from '../access-token.payload';
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

  async validate(req: Request, payload: AccessTokenPayload): Promise<User> {
    const accessToken = req.headers.authorization.split(' ')[1];
    const check = await this.cacheManager.get(accessToken);

    if (check) throw new UnauthorizedException();
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
