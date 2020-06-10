import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user/profiles')
export class ProfilesController {
  constructor(private userService: UserService) {}

  @Get('/:username')
  async findUserProfile(@Param('username') username: string): Promise<any> {
    console.log('GetUserProfile');
    const user = await this.userService.findByUsername(username);
    if (!user) throw new NotFoundException();
    else return { profile: user };
  }
}
