import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '../../../commons/entities/common.entity';
import { Column, Entity } from 'typeorm';

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
}
