import { Field, InputType } from '@nestjs/graphql';
import { CreateStoreInput } from 'src/apis/spaces/stores/dto/create.store.dto';
import { User } from 'src/apis/users/entities/user.entity';
import { CreateTumblerRecordInput } from '../../dto/create.tumbler-record.dto';

@InputType()
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
