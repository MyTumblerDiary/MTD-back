import { InputType, PartialType } from '@nestjs/graphql';
import { CreateTumblerRecordInput } from './create.tumbler-record.dto';

@InputType()
export class UpdateTumblerRecordInput extends PartialType(
  CreateTumblerRecordInput,
) {}
