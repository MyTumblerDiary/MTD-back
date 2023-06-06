import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Store } from 'src/apis/spaces/stores/entities/store.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { CommonEntity } from 'src/commons/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

registerEnumType(PlaceType, {
  name: 'PlaceType',
  description: '텀블러를 사용한 장소의 타입입니다. ',
});

@Entity({
  name: 'tumbler_records',
})
@InputType('TumblerRecordInputType', { isAbstract: true })
@ObjectType({ description: '텀블러 기록 Entity' })
export class TumblerRecord extends CommonEntity implements TumblerRecord {
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

  @Field(() => String, {
    description: '텀블러를 사용한 장소의 타입입니다. ',
    nullable: true,
  })
  @Column({
    type: 'varchar',
    length: 40,
  })
  placeType: string;

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
}
