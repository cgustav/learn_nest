import { IsString, IsArray, IsOptional } from 'class-validator';
import { ProfileResponse } from './user.models';

export class CreateArticleDTO {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  tagList: string[];
}

export class UpdateArticleDTO {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  body: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tagList: string[];
}
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
