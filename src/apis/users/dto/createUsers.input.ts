import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { User } from '../entities/user.entity';
@InputType()
export class CreateUserInput extends PickType(User, [
  'email',
  'password',
  'name',
  'age',
] as const) {
  // @Field(() => String)
  // email: string;
  // @Field(() => String)
  // password: string;
  // @Field(() => String)
  // name: string;
  // @Min(0)
  // @Field(() => Int)
  // age: number;
}
