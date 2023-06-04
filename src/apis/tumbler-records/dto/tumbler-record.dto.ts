import { Field, ObjectType } from '@nestjs/graphql';
import { TumblerRecord } from '../entities/tumbler-record.entity';

@ObjectType()
export class TumblerRecordsOutput {
  @Field(() => [TumblerRecord], {
    description: '유저의 모든 텀블러 기록을 모두 가져옵니다.',
  })
  tumblerRecords: TumblerRecord[];

  @Field(() => Number, {
    description: '유저가 지금까지 할인 받은 총 금액을 가져옵니다.',
  })
  totalDiscount: number;

  @Field(() => Number, {
    description: '유저의 텀블러 기록 개수를 가져옵니다.',
  })
  totalUsedTumbler: number;

  @Field(() => Number, {
    description: '검색 필터를 적용한 텀블러 기록의 개수를 가져옵니다.',
    nullable: true,
  })
  filteredTumbler?: number;

  @Field(() => Number, {
    description: '검색 필터를 적용한 텀블러 기록의 총 할인 금액을 가져옵니다.',
    nullable: true,
  })
  filteredDiscount?: number;
}
