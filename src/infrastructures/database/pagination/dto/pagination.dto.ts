import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Number, { defaultValue: 1 })
  page = 1;

  @Field(() => Number, { defaultValue: 10 })
  limit = 10;
}

@ObjectType()
export class PaginationOutput {
  @Field(() => Number, { nullable: false })
  totalCount: number;

  @Field(() => Number, { nullable: false })
  currentCount: number;

  @Field(() => Number, { nullable: false })
  totalPages: number;

  @Field(() => Number, { nullable: false })
  currentPage: number;
}
