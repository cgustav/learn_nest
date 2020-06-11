import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findUserProfileByUsername(
    username: String,
    userData?: UserEntity,
  ): Promise<UserEntity> {
    return await await (
      await this.userRepo.findOne({
        where: { username },
        relations: ['followers'],
      })
    ).toProfile(userData);
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
    return user.toProfile(currentUser);
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
    return user.toProfile(currentUser);
  }
}
