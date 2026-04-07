import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';
import {
  BaseEntity as TypeormBaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Definition, Property } from '@/common/decorators/graphql-query-core';

@Definition()
@Entity()
@ObjectType()
export class BaseEntityId extends TypeormBaseEntity {
  @Property({
    filterable: true,
    name: 'id',
    required: true,
    sortable: true,
    type: () => GraphQLUUID,
  })
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

@Definition()
@Entity()
@ObjectType()
export class BaseEntity extends BaseEntityId {
  @Property({ filterable: true, sortable: true })
  @Field()
  @CreateDateColumn()
  createdAt?: Date;

  @Property({ filterable: true, sortable: true })
  @Field()
  @UpdateDateColumn()
  updatedAt?: Date;
}

@Definition()
@Entity()
@ObjectType()
export class BaseAuditedEntity extends BaseEntity {
  @Property({ filterable: true, sortable: true })
  @Field()
  @Column({ nullable: true })
  createdById?: string;

  @Property({ filterable: true, sortable: true })
  @Field()
  @Column({ nullable: true })
  updatedById?: string;
}

@Definition()
@Entity()
@ObjectType()
export class FinancialBaseEntity extends BaseEntity {
  @Property({ filterable: true, sortable: true })
  @Field()
  @Column({ nullable: true })
  createdById?: string;

  @Property({ filterable: true, sortable: true })
  @Field()
  @Column({ nullable: true })
  updatedById?: string;

  @Property({ filterable: true, sortable: true })
  @Field()
  @Column({ nullable: true })
  createdByPositionId?: string;

  @Property({ filterable: true, sortable: true })
  @Field()
  @Column({ nullable: true })
  updatedByPositionId?: string;
}

@Definition()
@Entity()
@ObjectType()
export class BaseAccountingEntity extends BaseAuditedEntity {
  @Field()
  @Property({ filterable: true, sortable: true })
  @Column()
  @Generated('increment')
  seqId: number;

  @Field()
  @Property({ filterable: true })
  @Column({ default: false, type: 'bool' })
  isDeleted: boolean;
}
