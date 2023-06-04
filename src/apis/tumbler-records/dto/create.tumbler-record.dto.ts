import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { TumblerRecord } from '../entities/tumbler-record.entity';

@InputType()
export class CreateTumblerRecordInput extends PartialType(
  PickType(TumblerRecord, ['imageFileKey', 'prices', 'memo', 'usedAt']),
) {
  @Field(() => String, {
    description: '텀블러를 사용한 가게입니다. ',
    nullable: true,
  })
  storeId?: string;
}

@InputType({
  description: '새로운 공간에 대한 텀블러 기록을 생성할 때 사용되는 Input Type',
})
export class CreateTumblerRecordOnPrivateSpaceInput extends PickType(
  TumblerRecord,
  ['imageFileKey', 'prices', 'memo', 'usedAt', 'placeType'],
) {}
