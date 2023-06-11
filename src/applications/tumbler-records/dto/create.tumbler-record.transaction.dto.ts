import { Field, InputType, PickType } from '@nestjs/graphql';
import { CreateStoreInput } from 'src/applications/stores/dto/create.store.dto';
import { User } from 'src/applications/users/entities/user.entity';
import { CreateTumblerRecordInput } from './create.tumbler-record.dto';

@InputType('CreateTumblerRecordTransactionInputType', {
  isAbstract: true,
})
export class CreateTumblerRecordTransactionInput {
  @Field(() => CreateTumblerRecordInput, {
    description: '텀블러 기록을 생성을 위한 Input data입니다. ',
  })
  createTumblerRecordInput: CreateTumblerRecordInput;

  @Field(() => CreateStoreInput, {
    description: '공간 생성을 위한 Input data입니다. ',
  })
  createStoreInput: CreateStoreInput;

  @Field(() => User, {
    description: '유저 정보입니다. ',
  })
  user: User;
}
@InputType()
export class CreateTumblerRecordWithCreateStoreInput extends PickType(
  CreateTumblerRecordTransactionInput,
  ['createTumblerRecordInput', 'createStoreInput'] as const,
) {}
