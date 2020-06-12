import * as slug from 'slug';
import { AbstractEntity } from './abstract-entity';
import {
  Entity,
  Column,
  BeforeInsert,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  RelationCount,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';

import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';

/*
{
  "article": {
    "slug": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }
}
*/
@Entity('articles')
export class ArticleEntity extends AbstractEntity {
  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @ManyToMany(
    type => UserEntity,
    user => user.favorites,
    { eager: true },
  )
  @JoinTable()
  favoritedBy: UserEntity[];

  @RelationCount((article: ArticleEntity) => article.favoritedBy)
  favoritesCount: number;

  @ManyToOne(
    type => UserEntity,
    user => user.articles,
    { eager: true },
  )
  author: UserEntity;

  @OneToMany(
    type => CommentEntity,
    comment => comment.article,
  )
  comments: CommentEntity[];

  @Column('simple-array')
  tagList: string[];

  @BeforeInsert()
  generateSlug(): void {
    this.slug =
      slug(this.title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }

  toJSON() {
    return classToPlain(this);
  }

  toArticle(user: UserEntity) {
    let favorited = null;
    if (user)
      favorited =
        this.favoritedBy?.map(user => user.id).includes(user.id) || false;
    const article: any = this.toJSON();
    delete article.favoritedBy;
    // delete article.author;
    return { ...article, favorited };
  }
}
