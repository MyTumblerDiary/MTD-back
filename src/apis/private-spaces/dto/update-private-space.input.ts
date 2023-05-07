import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePrivateSpaceInput } from './create-private-space.input';

@InputType()
export class UpdatePrivateSpaceInput extends PartialType(
  CreatePrivateSpaceInput,
) {}
