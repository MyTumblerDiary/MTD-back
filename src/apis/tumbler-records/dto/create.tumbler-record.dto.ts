import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { TumblerRecord } from '../entities/tumbler-record.entity';

@InputType()
export class CreateTumblerRecordInput extends PartialType(
  PickType(TumblerRecord, ['imageFileKey', 'prices']),
) {}
