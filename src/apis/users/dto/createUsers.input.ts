import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
@InputType()
export class CreateUserInput extends PartialType(
  PickType(User, ['email', 'password', 'nickname', 'social'] as const),
) {}
