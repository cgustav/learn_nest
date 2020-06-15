import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(LocalAuthGuard)
  tempAuth() {
    return { auth: 'works' };
  }

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const token = await this.authService.signPayload({
      username: user.username,
      seller: user.seller,
    });

    return { user, token };
  }

  @Post('signup')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    const token = await this.authService.signPayload({
      username: user.username,
      seller: user.seller,
    });

    return { user, token };
  }
}
