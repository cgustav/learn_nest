import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  email: string;

  @Column('int', { array: true, nullable: true })
  trips: number[];
}
