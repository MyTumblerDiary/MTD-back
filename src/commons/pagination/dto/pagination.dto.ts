import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Number, { defaultValue: 1 })
  page = 1;

  @Field(() => Number, { defaultValue: 10 })
  limit = 10;
}
