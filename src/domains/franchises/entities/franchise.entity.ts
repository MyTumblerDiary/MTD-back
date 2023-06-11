import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { Store } from 'src/domains/stores/entities/store.entity';
import { CommonEntity } from 'src/infrastructures/database/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({
  name: 'franchises',
})
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

  @OneToMany(() => Store, (stores) => stores.franchise, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @Field(() => [Store], {
    nullable: true,
    description: '가맹점에 속한 가게들입니다. ',
  })
  stores: Store[];
}
