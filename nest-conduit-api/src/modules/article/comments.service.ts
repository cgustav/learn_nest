import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from 'src/entities/comment.entity';
import { ArticleEntity } from 'src/entities/article.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CreateCommentDTO } from 'src/models/comment.models';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
    @InjectRepository(ArticleEntity)
    private articleRepo: Repository<ArticleEntity>,
  ) {}

  async findById(id: number): Promise<CommentEntity> {
    return await this.commentRepo.findOne({ where: { id } });
  }

  async findByArticleSlug(slug: string): Promise<CommentEntity[]> {
    // return await this.commentRepo.find({
    //   where: { 'article.slug': slug },
    //   relations: ['article'],
    // });

    //TypeORM Workaround
    return await this.commentRepo
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.article', 'article')
      .where('article.slug = :slug', { slug })
      .getMany();
  }

  async createComment(
    user: UserEntity,
    slug: string,
    data: CreateCommentDTO,
  ): Promise<CommentEntity> {
    let article = await this.articleRepo.findOne({ where: { slug } });

    if (!article)
      throw new ConflictException('commentary slug does not exists');

    let comment = this.commentRepo.create(data);
    comment.author = user;
    await comment.save();

    article.comments?.push(comment);
    await article.save();

    return comment;
  }

  async deleteComment(
    user: UserEntity,
    slug: string,
    id: number,
  ): Promise<CommentEntity> {
    let article = await this.articleRepo.findOne({ where: { slug } });

    if (!article)
      throw new ConflictException('commentary slug does not exists');

    const comment = await this.commentRepo.findOne({
      where: { id, 'author.id': user.id },
    });

    await comment.remove();

    article.comments.filter(comment => comment.id !== id);
    await article.save();

    return await this.findById(id);
  }
}
