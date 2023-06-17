import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { SearchInput } from 'src/infrastructures/database/search/dto/search.dto';
import { TumblerRecord } from '../entities/tumbler-record.entity';
import { OrderTumblerRecordInput } from './order.tumbler-record.dto';
import { PaginateTumblerRecordInput } from './paginate.tumbler-record.dto';

@InputType()
export class FindWithOptionsTumblerRecordInput {
  @Field(() => PaginateTumblerRecordInput, {
    description: '텀블러 기록을 가져올 때 사용할 페이징 옵션입니다.',
    nullable: true,
  })
  paginateInput: PaginateTumblerRecordInput;

  @Field(() => SearchInput, {
    description: '텀블러 기록을 가져올 때 사용할 검색 옵션입니다.',
    nullable: true,
  })
  searchInput?: SearchInput;

  @Field(() => OrderTumblerRecordInput, {
    description: '텀블러 기록을 가져올 때 사용할 정렬 옵션입니다.',
    nullable: true,
  })
  orderInput: OrderTumblerRecordInput;
}

@ObjectType()
export class FindWithOptionsTumblerRecordOutput {
  @Field(() => [TumblerRecord], {
    description: '텀블러 기록을 가져옵니다.',
  })
  tumblerRecords: TumblerRecord[];
}
