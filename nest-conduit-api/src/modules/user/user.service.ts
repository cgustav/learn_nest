import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileResponse } from 'src/models/user.models';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findUserProfileByUsername(
    username: String,
    userData?: UserEntity,
  ): Promise<UserEntity> {
    return await this.userRepo.findOne({
      where: { username },
      relations: ['followers'],
    });
  }

  async followUser(
    currentUser: UserEntity,
    username: string,
  ): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      where: { username },
      relations: ['followers'],
    });

    user.followers.push(currentUser);
    await user.save();
    return user;
  }

  async unfollowUser(
    currentUser: UserEntity,
    username: string,
  ): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      where: { username },
      relations: ['followers'],
    });

    // user.followers.push(currentUser);
    user.followers.filter(follower => follower !== currentUser);
    await user.save();
    return user;
  }
}
