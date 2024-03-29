import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateUserInput } from './createUsers.input';

@InputType()
export class UpdateUserInput extends PartialType(
  PickType(CreateUserInput, ['password', 'nickname']),
) {}
