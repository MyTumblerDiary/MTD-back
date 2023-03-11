import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      //   clientID: process.env.OAUTH_KAKAO_ID,
      //   clientSecret: process.env.OAUTH_KAKAO_SECRET,
      //   callbackURL: process.env.OAUTH_KAKAO_CALLBACK,
      //   scope: ['account_email', 'profile_nickname'],
      clientID: 'eb74b9301ea0cc3e138cc1eca2181264',
      clientSecret: 'Lgw7X4BjbRW0yARzOThPHTIDYwUwp3cW',
      callbackURL: 'http://localhost:3000/login/kakao',
      scope: ['account_email', 'profile_nickname'],
    });
  }
  validate(accessToken, refreshToken, profile) {
    console.log('kakao프로필: ', profile);
    // return {
    //   email: profile.emails[0].value,
    //   password: '1234555',
    //   name: profile.displayName,
    //   age: 0,
    // };
  }
}
