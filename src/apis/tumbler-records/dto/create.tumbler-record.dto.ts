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

  @Field(() => String, {
    description: '텀블러를 사용한 개인 공간입니다. ',
    nullable: true,
  })
  privateSpaceId?: string;
}
