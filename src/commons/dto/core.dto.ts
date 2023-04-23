import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreOutput {
  @Field(() => Boolean, {
    nullable: false,
  })
  ok: boolean;

  @Field(() => String, {
    nullable: true,
  })
  message?: string;
}
