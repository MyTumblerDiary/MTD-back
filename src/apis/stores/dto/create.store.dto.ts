import { Field, InputType, PickType } from '@nestjs/graphql';
import { Store } from '../entities/store.entity';

@InputType()
export class CreateStoreInput extends PickType(Store, [
  'name',
  'discountPrice',
  'streetNameAddress',
  'lotNumberAddress',
  'detailAddress',
  'latitude',
  'longitude',
  'imageFileKey',
]) {
  @Field(() => String, {
    nullable: true,
    description: '프랜차이즈 id입니다. 프랜차이즈라면 해당 id를 넣어주세요. ',
  })
  franchiseId?: string;
}
