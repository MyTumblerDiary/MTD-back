import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchInput {
  @Field(() => String, { nullable: true })
  filter: string;

  @Field(() => String, { nullable: true })
  value: string;

  @Field(() => String, { nullable: true })
  order: string;
}
