import { InputType, PickType } from '@nestjs/graphql';
import { Franchise } from '../entities/franchise.entity';

@InputType()
export class CreateFranchiseInput extends PickType(Franchise, [
  'name',
  'discountPrice',
]) {}
