import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  name: string;

  @Min(0)
  @Field(() => Int)
  age: number;
}
