import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/entities/article.entity';
import { Repository, Like, SelectQueryBuilder } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import {
  CreateArticleDTO,
  UpdateArticleDTO,
  FindAllArticlesQuery,
  FindFeedArticlesQuery,
} from 'src/models/article.models';
import { TagEntity } from 'src/entities/tag.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepo: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(TagEntity)
    private tagRepo: Repository<TagEntity>,
  ) {}

  async findAll(query: FindAllArticlesQuery): Promise<ArticleEntity[]> {
    //Complex Query TypeORM Workaround
    let complexQuery: SelectQueryBuilder<ArticleEntity> = this.articleRepo.createQueryBuilder(
      'article',
    );
    complexQuery.leftJoinAndSelect('article.author', 'author');
    if (query.author)
      complexQuery.where('author.username = :username', {
        username: query.author,
      });

    complexQuery.leftJoin('article.favoritedBy', 'favoritedBy');
    if (query.favorited)
      complexQuery.where('favoritedBy.username = :username', {
        username: query.favorited,
      });

    if (query.tag)
      complexQuery.where({
        tagList: Like(`%${query.tag}%`),
      });

    return await complexQuery
      .offset(query.offset)
      .limit(query.limit)
      .getMany();
  }

  /**
   * Returns all articles from authors who the
   * authenticated user is actually following.
   * @param user
   * @param query
   */
  async findFeed(
    user: UserEntity,
    query: FindFeedArticlesQuery,
  ): Promise<ArticleEntity[]> {
    const { followee } = await this.userRepo.findOne({
      where: { id: user.id },
      relations: ['followee'],
    });

    const findOptions = {
      ...query,
      where: followee.map(follow => ({ author: follow.id })),
    };

    return await this.articleRepo.find(findOptions);
  }

  async findArticleBySlug(slug: string): Promise<ArticleEntity> {
    return await this.articleRepo.findOne({ where: { slug } });
  }

  async createArticle(
    user: UserEntity,
    data: CreateArticleDTO,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepo.create(data);
    article.author = user;
    await this.upsertTags(data.tagList);
    const { slug } = await article.save();
    // return article;
    return await this.articleRepo.findOne({ slug });
  }

  async updateArticle(
    slug: string,
    user: UserEntity,
    data: UpdateArticleDTO,
  ): Promise<ArticleEntity> {
    const article = await this.findArticleBySlug(slug);
    if (!this.ensureOwnership(user, article)) throw new UnauthorizedException();
    await this.articleRepo.update({ slug }, data);
    return article;
    // return article.toArticle(user);
  }

  async deleteArticle(slug: string, user: UserEntity): Promise<ArticleEntity> {
    const article = await this.findArticleBySlug(slug);
    if (!this.ensureOwnership(user, article)) throw new UnauthorizedException();
    else return await this.articleRepo.remove(article);
  }

  async userFavoriteArticle(
    slug: string,
    user: UserEntity,
  ): Promise<ArticleEntity> {
    const article = await this.findArticleBySlug(slug);
    console.log('UNFAVORITE ARTICLE: ', article);
    article.favoritedBy?.push(user);
    await article.save();
    return await this.findArticleBySlug(slug);
  }

  async userUnfavoriteArticle(
    slug: string,
    user: UserEntity,
  ): Promise<ArticleEntity> {
    const article = await this.findArticleBySlug(slug);
    console.log('UNFAVORITE ARTICLE: ', article);
    article.favoritedBy =
      article.favoritedBy?.filter(fav => fav.id !== user.id) || Array();
    await article.save();
    // return article;
    return await this.findArticleBySlug(slug);
  }

  private ensureOwnership(user: UserEntity, article: ArticleEntity): boolean {
    return article.author.id === user.id;
  }

  private async upsertTags(tags: string[]) {
    const foundTags = await this.tagRepo.find({
      where: tags.map(t => ({ tag: t })),
    });
    const newTags = tags.filter(t => !foundTags.map(t => t.tag).includes(t));
    await Promise.all(
      this.tagRepo.create(newTags.map(t => ({ tag: t }))).map(n => n.save()),
    );
  }
}
