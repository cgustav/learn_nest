import { IsString } from 'class-validator';
import { ProfileResponse } from './user.models';
import { UserEntity } from 'src/entities/user.entity';

export class CreateCommentDTO {
  @IsString()
  body: string;
}

export class CommentResponse {
  id: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  body: string;
  author: ProfileResponse | UserEntity;
}
