import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import { CommonEntity } from 'src/commons/entities/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({})
@InputType('TumblerRecordInputType', { isAbstract: true })
@ObjectType({ description: '텀블러 기록 Entity' })
export class TumblerRecord extends CommonEntity {
  @Field(() => Int, { description: '텀블러 할인 금액', nullable: false })
  @Column({ type: 'int' })
  prices: number;

  @Field(() => String, { description: '텀블러 이미지 파일 키', nullable: true })
  @Column({ type: 'text', nullable: true })
  imageFileKey: string;

  @Field(() => User, {
    description: '텀블러 기록을 가진 유저',
    nullable: false,
  })
  @ManyToOne(() => User, (user) => user.tumblerRecords)
  user: User;
}
