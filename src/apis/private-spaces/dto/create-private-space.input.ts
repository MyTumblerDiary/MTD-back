import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePrivateSpaceInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
