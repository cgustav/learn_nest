import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    return await this.userService.findByLogin(userDTO);
  }

  @Post('signup')
  async register(@Body() userDTO: RegisterDTO) {
    console.log('signup body: ', userDTO);
    return await this.userService.create(userDTO);
  }
}
