import { IsString, IsArray, IsOptional } from 'class-validator';
import { ProfileResponse } from './user.models';
import { ApiProperty, ApiQuery, ApiQueryOptions } from '@nestjs/swagger';

export class CreateArticleDTO {
  @IsString()
  @ApiProperty({ type: String, description: 'article title' })
  title: string;

  @IsString()
  @ApiProperty({ type: String, description: 'article content' })
  body: string;

  @IsString()
  @ApiProperty({ type: String, description: 'article summary' })
  description: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ type: [String], description: 'content tags' })
  tagList: string[];
}

export class CreateArticleBody {
  @ApiProperty()
  article: CreateArticleDTO;
}

export class UpdateArticleDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'article title' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'article content' })
  body: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'article summary' })
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({ type: [String], description: 'content tags' })
  tagList: string[];
}

/* INTERFACES */

export interface FindFeedArticlesQuery {
  limit?: number;
  offset?: number;
}

export interface FindAllArticlesQuery extends FindFeedArticlesQuery {
  tag?: string;
  author?: string;
  favorited?: string;
}

export interface ArticleResponse {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  favorited: boolean | null;
  favoritesCount: number;
  author: ProfileResponse;
}
