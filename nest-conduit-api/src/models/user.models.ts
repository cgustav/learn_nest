import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { UserEntity } from 'src/entities/user.entity';

export class LoginDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}

export class UpdateDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  bio: string;
}

export class SearchDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  email?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username?: string;

  @IsBoolean()
  withToken?: boolean;
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
