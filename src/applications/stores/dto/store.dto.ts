import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Store } from '../entities/store.entity';

@ObjectType()
export class StoresOutput {
  @Field(() => [Store], {
    description: '가게 목록',
  })
  stores: Store[];

  @Field(() => Int, {
    description: '가게 목록의 총 개수',
  })
  totalCount: number;

  @Field(() => Int, {
    description:
      '검색된 가게 목록의 총 페이지 수(검색하지 않으면 총 페이지 수)',
  })
  pagesCount: number;

  @Field(() => Int, {
    description: '검색된 가게의 수',
  })
  searchedCount: number;

  @Field(() => Int, {
    description: '현재 페이지',
  })
  currentPage: number;
}
