import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/apis/users/entities/user.entity';
import { AccessTokenPayload } from '../access-token.payload';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpriraton: false,
      secretOrKey: process.env.ACCESS_SECRET_KEY,
    });
  }

  validate(payload: AccessTokenPayload): User {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
