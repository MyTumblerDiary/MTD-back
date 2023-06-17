import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/infrastructures/database/pagination/dto/pagination.dto';
import { TumblerRecord } from '../entities/tumbler-record.entity';

@InputType()
export class PaginateTumblerRecordInput extends PaginationInput {}

@ObjectType()
export class PaginatedTumblerRecordOutput extends PartialType(
  PaginationOutput,
) {
  @Field(() => [TumblerRecord], {
    description: '텀블러 기록을 가져옵니다.',
  })
  tumblerRecords: TumblerRecord[];
}
