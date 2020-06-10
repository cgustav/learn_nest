import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateDTO } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findByUsername(username: String): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { username } });
  }

  async updateUser(username: string, data: UpdateDTO): Promise<UserEntity> {
    await this.userRepo.update({ username }, data);
    return await this.findByUsername(username);
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
    return user;
  }
}
