import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '680008447863-mrmrcp6oqsa65un38of0ggjd91eijkq1.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }
  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return {
      email: profile.emails[0].value,
      password: '1234555',
      name: profile.displayName,
      age: 0,
    };
  }
}
