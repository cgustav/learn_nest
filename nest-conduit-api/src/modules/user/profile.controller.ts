import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  UseGuards,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UserEntity } from 'src/entities/user.entity';
import { User } from 'src/decorators/user.decorator';
import { ResponseObject } from 'src/models/response.models';
import { ProfileResponse } from 'src/models/user.models';

import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OptionalAuthGuard } from '../auth/optional-auth.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private userService: UserService) {}

  @Get('/:username')
  @UseGuards(OptionalAuthGuard)
  @ApiOkResponse({ description: 'Find user profile' })
  async findUserProfile(
    @User() authenticated: UserEntity,
    @Param('username') username: string,
  ): Promise<ResponseObject<'profile', ProfileResponse>> {
    const profile = await this.userService.findUserProfileByUsername(
      username,
      authenticated,
    );
    if (!profile) throw new NotFoundException();
    else return { profile: profile.toProfile(authenticated) };
  }

  @Post('/:username/follow')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Follow user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async followUser(
    @User() authenticated: UserEntity,
    @Param('username') username: string,
  ): Promise<ResponseObject<'profile', ProfileResponse>> {
    const profile = await this.userService.followUser(authenticated, username);
    return { profile: profile.toProfile(authenticated) };
  }

  @Delete('/:username/follow')
  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Follow user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async unfollowUser(
    @User() authenticated: UserEntity,
    @Param('username') username: string,
  ): Promise<ResponseObject<'profile', ProfileResponse>> {
    const profile = await this.userService.unfollowUser(
      authenticated,
      username,
    );
    return { profile: profile.toProfile(authenticated) };
  }
}
