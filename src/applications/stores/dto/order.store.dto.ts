import { Field, InputType } from '@nestjs/graphql';
import { OrderInput } from 'src/infrastructures/database/order/dto/order-by.dto';
import { StoreField } from '../enums/store-field.enum';

@InputType()
export class OrderStoreInput extends OrderInput {
  constructor() {
    super();
  }

  @Field(() => StoreField, { nullable: true })
  orderBy: StoreField = StoreField.NAME;
}
