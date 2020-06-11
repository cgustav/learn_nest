import {
  Controller,
  Post,
  Body,
  //   UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO } from 'src/models/user.model';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async register(
    @Body(ValidationPipe) credentials: { user: RegisterDTO },
  ): Promise<Object> {
    const user = await this.authService.register(credentials.user);
    return this.authService.signUserWithJWT(user);
  }

  @Post('/login')
  async login(
    @Body(ValidationPipe) credentials: { user: LoginDTO },
  ): Promise<Object> {
    const user = await this.authService.login(credentials.user);
    return this.authService.signUserWithJWT(user);
  }
}
