import { InputType } from '@nestjs/graphql';
import { OrderInput } from 'src/infrastructures/database/order/dto/order-by.dto';

@InputType()
export class OrderTumblerRecordInput extends OrderInput {}
