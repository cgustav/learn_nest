import { AbstractEntity } from './abstract-entity';
import { Entity, Column } from 'typeorm';

@Entity('tag')
export class TagEntity extends AbstractEntity {
  @Column()
  tag: string;

  toJSON() {
    return this.tag;
  }
}
