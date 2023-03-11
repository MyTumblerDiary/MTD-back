import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserInput } from '../users/dto/createUsers.input';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/users.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'age'>;
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request,
    //@Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    return await this.authService.social_login({ req, res });
  }

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: Request,
    //@Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    return await this.authService.social_login({ req, res });
  }
}
