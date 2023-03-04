import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
    });
  }
  validate(payload) {
    console.log(payload);
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
