import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UserEntity } from 'src/entities/user.entity';
import { User } from 'src/decorators/user.decorator';

@Controller('user/profiles')
export class ProfilesController {
  constructor(private userService: UserService) {}

  @Get('/:username')
  async findUserProfile(@Param('username') username: string): Promise<any> {
    const profile = await this.userService.findByUsername(username);
    if (!profile) throw new NotFoundException();
    else return { profile };
  }

  @Post('/:username/follow')
  @UseGuards(LocalAuthGuard)
  async followUser(
    @User() authenticated: UserEntity,
    @Param('username') username: string,
  ): Promise<any> {
    const profile = await this.userService.followUser(authenticated, username);
    return { profile };
  }

  @Delete('/:username/follow')
  @UseGuards(LocalAuthGuard)
  async unfollowUser(
    @User() authenticated: UserEntity,
    @Param('username') username: string,
  ): Promise<any> {
    const profile = await this.userService.unfollowUser(
      authenticated,
      username,
    );
    return { profile };
  }
}
