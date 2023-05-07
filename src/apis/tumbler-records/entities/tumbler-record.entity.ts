import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Store } from 'src/apis/spaces/stores/entities/store.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { CommonEntity } from 'src/commons/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({})
@InputType('TumblerRecordInputType', { isAbstract: true })
@ObjectType({ description: '텀블러 기록 Entity' })
export class TumblerRecord extends CommonEntity {
  @Field(() => Int, { description: '텀블러 할인 금액', nullable: false })
  @Column({ type: 'int' })
  prices: number;

  @Field(() => String, { description: '텀블러 기록 메모', nullable: true })
  @Column({ type: 'text', nullable: true })
  memo: string;

  @Field(() => String, { description: '텀블러 이미지 파일 키', nullable: true })
  @Column({ type: 'text', nullable: true })
  imageFileKey: string;

  @Field(() => String, {
    description: '텀블러를 사용한 날짜입니다. 양식은 YYYY-MM-DD입니다. ',
  })
  @Column({ type: 'varchar', length: 10 })
  usedAt: string;

  @Field(() => User, {
    description: '텀블러 기록을 가진 유저',
    nullable: false,
  })
  @ManyToOne(() => User, (user) => user.tumblerRecords)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Store, (store) => store.tumblerRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  store: Store;
}
