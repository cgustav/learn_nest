import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProfilesController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({
      defaultStrategy: 'myjwt',
    }),
    JwtModule.register({
      secret: process.env.SECRET,
    }),
  ],
  controllers: [UserController, ProfilesController],
  providers: [UserService, AuthService],
  exports: [UserService],
})
export class UserModule {}
