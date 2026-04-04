import { ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, Relation } from 'typeorm';

import { BaseEntity } from '../base-entities';

@Entity('tags')
@ObjectType()
export class Tag extends BaseEntity {
  @Column({ type: 'varchar', length: 30, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  colorCode: string;
}
