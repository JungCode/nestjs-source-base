import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../base-entities';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
  @Field(() => String)
  @Column({ length: 100, nullable: false, type: 'varchar', unique: true })
  email: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Field(() => String)
  @Column({ length: 50, nullable: false, type: 'varchar' })
  userName: string;

  @Column({ nullable: true, type: 'text' })
  refreshToken: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'varchar' })
  avatarKey: string;
}
