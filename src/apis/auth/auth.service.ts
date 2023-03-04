import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
  }
  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }
}
