import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/commons/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
@InputType('FranchiseInputType', { isAbstract: true })
@ObjectType({ description: '가맹점 Entity' })
export class Franchise extends CommonEntity {
  @Column({
    nullable: false,
    unique: true,
  })
  @Field(() => String, {
    nullable: false,
    description: '가맹점 이름입니다. ',
  })
  name: string;

  @Column({
    nullable: false,
  })
  @Field(() => Int, {
    nullable: true,
    description: '가맹점 텀블러 할인 금액입니다. ',
  })
  discountPrice: number;
}
