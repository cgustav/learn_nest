import {
  Controller,
  Get,
  UseGuards,
  Put,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities/user.entity';
import { User } from 'src/decorators/user.decorator';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UpdateDTO } from 'src/models/user.model';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(LocalAuthGuard)
  async findCurrentUser(@User() { username }: UserEntity): Promise<UserEntity> {
    return await this.userService.findByUsername(username);
  }

  @Put()
  @UseGuards(LocalAuthGuard)
  async update(
    @User() { username }: UserEntity,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    data: UpdateDTO,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(username, data);
  }
}
