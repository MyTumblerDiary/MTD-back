import { InputType, PickType } from '@nestjs/graphql';
import { PrivateSpace } from '../entities/private-space.entity';

@InputType()
export class CreatePrivateSpaceInput extends PickType(PrivateSpace, [
  'name',
  'streetNameAddress',
  'lotNumberAddress',
  'detailAddress',
  'latitude',
  'longitude',
]) {}
