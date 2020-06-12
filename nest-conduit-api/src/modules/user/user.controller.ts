import {
  Controller,
  Get,
  UseGuards,
  Put,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { User } from 'src/decorators/user.decorator';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UpdateDTO } from 'src/models/user.models';
import { AuthService } from '../auth/auth.service';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Current user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findCurrentUser(@User() { username }: UserEntity): Promise<any> {
    const user = await this.authService.findCurrentUser(username);
    return this.authService.signUserWithJWT(user);
  }

  @Put()
  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update current user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async update(
    @User() { username }: UserEntity,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    data: UpdateDTO,
  ): Promise<any> {
    const user = await this.authService.updateUser(username, data);
    return this.authService.signUserWithJWT(user);
  }
}
