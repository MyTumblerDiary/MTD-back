import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.OAUTH_KAKAO_ID,
      clientSecret: process.env.OAUTH_KAKAO_SECRET,
      callbackURL: process.env.OAUTH_KAKAO_CALLBACK,
      scope: ['account_email', 'profile_nickname'],
    });
  }
  validate(accessToken, refreshToken, profile) {
    console.log('kakao프로필: ', profile);
    return {
      email: profile._json.kakao_account.email,
      password: '12345',
      name: profile.displayName,
      age: 0,
    };
  }
}
