import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { PrivateSpace } from 'src/apis/spaces/private-spaces/entities/private-space.entity';
import { Store } from 'src/apis/spaces/stores/entities/store.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { CommonEntity } from 'src/commons/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({})
@InputType('TumblerRecordInputType', { isAbstract: true })
@ObjectType({ description: '텀블러 기록 Entity' })
export class TumblerRecord extends CommonEntity {
  @Field(() => Int, { description: '텀블러 할인 금액', nullable: true })
  @Column({ type: 'int', nullable: true })
  prices?: number;

  @Field(() => String, { description: '텀블러 기록 메모', nullable: true })
  @Column({ type: 'text', nullable: true })
  memo?: string;

  @Field(() => String, { description: '텀블러 이미지 파일 키', nullable: true })
  @Column({ type: 'text', nullable: true })
  imageFileKey?: string;

  @Field(() => String, {
    description: '텀블러를 사용한 날짜입니다. 양식은 YYYY-MM-DD입니다. ',
    nullable: false,
  })
  @Column({ type: 'varchar', length: 10, nullable: false })
  usedAt!: string;

  @Field(() => User, {
    description: '텀블러 기록을 가진 유저',
    nullable: false,
  })
  @ManyToOne(() => User, (user) => user.tumblerRecords, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: User;

  @Field(() => Store, {
    description: '텀블러를 사용한 매장',
    nullable: true,
  })
  @ManyToOne(() => Store, (store) => store.tumblerRecords, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  store?: Store;

  @Field(() => PrivateSpace, {
    description: '텀블러를 사용한 개인 공간',
    nullable: true,
  })
  @ManyToOne(
    () => PrivateSpace,
    (privateSpace) => privateSpace.tumblerRecords,
    {
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  @JoinColumn({ name: 'private_space_id', referencedColumnName: 'id' })
  privateSpace?: PrivateSpace;
}
