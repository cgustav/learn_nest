import { IsString } from 'class-validator';
import { ProfileResponse } from './user.models';
import { UserEntity } from 'src/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDTO {
  @IsString()
  @ApiProperty({ type: String, description: 'comment content' })
  body: string;
}

export class CreateCommentBody {
  @ApiProperty()
  comment: CreateCommentDTO;
}

export class CommentResponse {
  id: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  body: string;
  author: ProfileResponse | UserEntity;
}
