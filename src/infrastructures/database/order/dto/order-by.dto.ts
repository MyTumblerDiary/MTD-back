import { Field, InputType } from '@nestjs/graphql';
import { OrderDirection } from '../enums/order.direction.enum';

@InputType()
export class OrderInput {
  @Field(() => String, { nullable: true })
  orderBy = 'id';

  @Field(() => OrderDirection, { nullable: true })
  orderDirection: OrderDirection = OrderDirection.DESC;
}
