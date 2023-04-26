import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { TumblerRecord } from 'src/apis/tumbler-records/entities/tumbler-record.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../../../commons/entities/common.entity';

@InputType('UserInputType', { isAbstract: true })
@Entity()
@ObjectType()
export class User extends CommonEntity {
  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  nickname: string;

  @Column({ default: '' })
  @Field(() => String)
  social: string;

  @Field(() => [TumblerRecord], {
    description: '유저가 가지고 있는 텀블러 기록들',
    nullable: true,
  })
  @OneToMany(() => TumblerRecord, (tumblerRecord) => tumblerRecord.user)
  tumblerRecords: TumblerRecord[];
}
