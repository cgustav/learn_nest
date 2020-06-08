import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserEntity } from './user.entity';
import { LaunchModule } from 'src/launch/launch.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), LaunchModule, HttpModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
