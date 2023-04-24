import { Field, InputType } from '@nestjs/graphql';
import { OrderDirection } from '../../order/enums/order.direction.enum';

@InputType()
export class SearchInput {
  @Field(() => String, { nullable: true, description: '검색할 필드입니다. ' })
  searchBy = 'id';

  @Field(() => String, { nullable: true, description: '검색할 값입니다. ' })
  value = '';

  @Field(() => OrderDirection, {
    nullable: true,
    description: '정렬 방식입니다. ',
  })
  order: OrderDirection = OrderDirection.DESC;
}
