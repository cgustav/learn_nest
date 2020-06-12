import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { UserEntity } from 'src/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'user email' })
  email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'secret user password' })
  password: string;
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'username (unique)' })
  username: string;
}

export class UpdateDTO {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ type: String, description: 'user email' })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'user image/thumbnail' })
  image: string;

  @ApiProperty({ type: String, description: 'user bio' })
  @IsOptional()
  bio: string;
}

export class SearchDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'user email' })
  email?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'username (unique)' })
  username?: string;
}

export interface AuthPayload {
  username: string;
}

export interface UserResponse {
  email: string;
  username?: string;
  bio: string;
  image: string | null;
}

export interface AuthResponse extends Partial<UserEntity> {
  token: string;
}

export interface ProfileResponse extends UserResponse {
  following: boolean | null;
}
