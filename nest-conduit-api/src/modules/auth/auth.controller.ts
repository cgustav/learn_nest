import {
  Controller,
  Post,
  Body,
  //   UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO, AuthResponse } from 'src/models/user.models';
import { ResponseObject } from 'src/models/response.models';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiCreatedResponse({ description: 'User Registration' })
  @ApiBadRequestResponse({ description: 'Invalid parameters' })
  @ApiBody({ type: RegisterDTO })
  async register(
    @Body('user', ValidationPipe) credentials: RegisterDTO,
  ): Promise<ResponseObject<'user', AuthResponse>> {
    const user = await this.authService.register(credentials);
    return this.authService.signUserWithJWT(user);
  }

  @Post('/login')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginDTO })
  async login(
    @Body('user', ValidationPipe) credentials: LoginDTO,
  ): Promise<ResponseObject<'user', AuthResponse>> {
    const user = await this.authService.login(credentials);
    return this.authService.signUserWithJWT(user);
  }
}
