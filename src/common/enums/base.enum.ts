import { registerEnumType } from '@nestjs/graphql';

export enum Language {
  EN = 'en',
  FR = 'fr',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

export enum AggregationType {
  SUM = 'sum',
  AVERAGE = 'average',
}
