import { Field, ObjectType } from '@nestjs/graphql';
import { TumblerRecord } from '../entities/tumbler-record.entity';

@ObjectType()
export class DateUnitTumblerRecordOutput {
  @Field(() => Number, {
    description: '텀블러 기록을 사용한 날짜의 일자입니다.',
  })
  day: number;

  @Field(() => Number, {
    description: '특정 일자에 사용한 텀블러 기록들의 가격 합입니다.',
  })
  sumOfdiscountedPrice: number;

  @Field(() => Number, {
    description: '특정 일자에 사용한 텀블러 기록들의 개수입니다.',
  })
  countOfTumblerRecords: number;

  @Field(() => [TumblerRecord], {
    description: '특정 일자에 사용한 텀블러 기록들입니다.',
  })
  value: TumblerRecord[];
}

@ObjectType()
export class DateArrangedTumblerRecordOutput {
  @Field(() => [DateUnitTumblerRecordOutput], {
    description: '텀블러 기록을 날짜별로 정리한 배열입니다.',
  })
  tumblerRecordsMap: DateUnitTumblerRecordOutput[];
}
