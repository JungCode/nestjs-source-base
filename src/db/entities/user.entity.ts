import { ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../base-entities';

@Entity('tags')
@ObjectType()
export class Tag extends BaseEntity {
  @Column({ length: 30, nullable: false, type: 'varchar' })
  title: string;

  @Column({ length: 30, nullable: false, type: 'varchar' })
  colorCode: string;
}
