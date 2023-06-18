import { InputType, PickType } from '@nestjs/graphql';
import { TumblerRecord } from '../entities/tumbler-record.entity';

@InputType()
export class CreateTumblerRecordInput extends PickType(TumblerRecord, [
  'imageFileKey',
  'prices',
  'memo',
  'usedAt',
  'placeType',
]) {}
