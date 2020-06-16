import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from '../../models/user.dto';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from './auth.service';

import { User } from '../../utilities/user.decorator';
import { SellerGuard } from '../../guards/seller.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  //TODO: This route is for development only. Remove it later
  @Get()
  @UseGuards(LocalAuthGuard, SellerGuard)
  async findAll(@User() authenticated: any) {
    console.log('authenticated: ', authenticated);
    return await this.userService.findAll();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
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
