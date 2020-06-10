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
  //   @UsePipes(ValidationPipe)
  async register(
    @Body(ValidationPipe) credentials: RegisterDTO,
  ): Promise<Object> {
    return this.authService.register(credentials);
  }

  @Post('/login')
  //   @UsePipes(ValidationPipe)
  async login(@Body(ValidationPipe) credentials: LoginDTO): Promise<Object> {
    return this.authService.login(credentials);
  }
}
