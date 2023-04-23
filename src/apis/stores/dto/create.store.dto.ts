import { InputType, PickType } from '@nestjs/graphql';
import { Store } from '../entities/store.entity';

@InputType()
export class CreateStoreInput extends PickType(Store, [
  'name',
  'discountPrice',
  'streetNameAddess',
  'lotNumberAddress',
  'detailAddress',
  'latitude',
  'longitude',
  'imageFileKey',
]) {}
