import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import {
  CreateArticleDTO,
  UpdateArticleDTO,
  FindAllArticlesQuery,
  FindFeedArticlesQuery,
  ArticleResponse,
} from 'src/models/article.models';
import { OptionalAuthGuard } from '../auth/optional-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDTO, CommentResponse } from 'src/models/comment.models';
import { ResponseObject } from 'src/models/response.models';

@Controller('articles')
export class ArticleController {
  constructor(
    private articleService: ArticleService,
    private commentService: CommentsService,
  ) {}

  @Get()
  @UseGuards(OptionalAuthGuard)
  async findAll(
    @User() authenticated: UserEntity,
    @Query() query: FindAllArticlesQuery,
  ): Promise<
    ResponseObject<'articles', ArticleResponse[]> &
      ResponseObject<'articlesCount', number>
  > {
    const articles = await this.articleService.findAll(query);
    return {
      articles: articles.map(article => article.toArticle(authenticated)),
      articlesCount: articles.length,
    };
  }

  @Get('/feed')
  @UseGuards(LocalAuthGuard)
  async findFeed(
    @User() authenticated: UserEntity,
    @Query() query: FindFeedArticlesQuery,
  ): Promise<
    ResponseObject<'articles', ArticleResponse[]> &
      ResponseObject<'articlesCount', number>
  > {
    const articles = await this.articleService.findFeed(authenticated, query);
    return {
      articles: articles.map(article => article.toArticle(authenticated)),
      articlesCount: articles.length,
    };
  }

  @Get('/:slug')
  @UseGuards(OptionalAuthGuard)
  async findBySlug(
    @Param('slug') slug: string,
    @User() authenticated: UserEntity,
  ): Promise<ResponseObject<'article', ArticleResponse>> {
    const article = await this.articleService.findArticleBySlug(slug);
    console.log('Article found: ', article);
    return { article: article.toArticle(authenticated) };
  }

  @Post()
  @UseGuards(LocalAuthGuard)
  async createArticle(
    @User() authenticated: UserEntity,
    @Body('article', ValidationPipe) data: CreateArticleDTO,
  ): Promise<ResponseObject<'article', ArticleResponse>> {
    const article = await this.articleService.createArticle(
      authenticated,
      data,
    );
    return { article: article.toArticle(authenticated) };
  }

  @Put('/:slug')
  @UseGuards(LocalAuthGuard)
  async updateArticle(
    @Param('slug') slug: string,
    @User() authenticated: UserEntity,
    @Body('article', ValidationPipe) data: UpdateArticleDTO,
  ): Promise<ResponseObject<'article', ArticleResponse>> {
    const article = await this.articleService.updateArticle(
      slug,
      authenticated,
      data,
    );
    return { article: article.toArticle(authenticated) };
  }

  @Delete('/:slug')
  @UseGuards(LocalAuthGuard)
  async deleteArticle(
    @Param('slug') slug: string,
    @User() authenticated: UserEntity,
  ): Promise<ResponseObject<'article', ArticleResponse>> {
    const article = await this.articleService.deleteArticle(
      slug,
      authenticated,
    );
    return { article: article.toArticle(authenticated) };
  }

  @Post('/:slug/favorite')
  @UseGuards(LocalAuthGuard)
  async favoriteArticle(
    @Param('slug') slug: string,
    @User() authenticated: UserEntity,
  ): Promise<ResponseObject<'article', ArticleResponse>> {
    console.log('CURRENT SLUG: ', slug);
    const article = (
      await this.articleService.userFavoriteArticle(slug, authenticated)
    ).toArticle(authenticated);
    return { article };
  }

  @Delete('/:slug/favorite')
  @UseGuards(LocalAuthGuard)
  async unfavoriteArticle(
    @Param('slug') slug: string,
    @User() authenticated: UserEntity,
  ): Promise<ResponseObject<'article', ArticleResponse>> {
    const article = (
      await this.articleService.userUnfavoriteArticle(slug, authenticated)
    ).toArticle(authenticated);
    return { article };
  }

  @Get('/:slug/comments')
  @UseGuards(OptionalAuthGuard)
  async getCommentFromArticle(
    @Param('slug') slug: string,
  ): Promise<ResponseObject<'comments', CommentResponse[]>> {
    const comments = await this.commentService.findByArticleSlug(slug);
    return { comments };
  }

  @Post('/:slug/comments')
  @UseGuards(LocalAuthGuard)
  async addCommentToArticle(
    @User() authenticated: UserEntity,
    @Body('comment', ValidationPipe) data: CreateCommentDTO,
    @Param('slug') slug: string,
  ): Promise<ResponseObject<'comment', CommentResponse>> {
    const comment = await this.commentService.createComment(
      authenticated,
      slug,
      data,
    );
    return { comment };
  }

  @Delete('/:slug/comments/:id')
  @UseGuards(LocalAuthGuard)
  async deleteCommentFromArticle(
    @User() authenticated: UserEntity,
    @Param('slug') slug: string,
    @Param('id') id: number,
  ): Promise<ResponseObject<'comment', CommentResponse>> {
    const comment = await this.commentService.deleteComment(
      authenticated,
      slug,
      id,
    );
    return { comment };
  }
}
