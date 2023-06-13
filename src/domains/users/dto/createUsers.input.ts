import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
@InputType()
export class CreateUserInput extends PartialType(
  PickType(User, ['email', 'nickname', 'social'] as const),
) {
  @Field(() => String, {
    description: '비밀번호',
    nullable: false,
  })
  password: string;
}
