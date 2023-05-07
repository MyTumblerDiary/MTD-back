import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreatePrivateSpaceInput } from './create-private-space.input';

@InputType()
export class UpdatePrivateSpaceInput extends PartialType(
  CreatePrivateSpaceInput,
) {
  @Field(() => Int)
  id: number;
}
