import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, {
    nullable: false,
  })
  id: string;

  @CreateDateColumn()
  @Field(() => String, {
    nullable: false,
  })
  createdAt?: Date;

  @UpdateDateColumn()
  @Field(() => String, {
    nullable: true,
  })
  updatedAt?: Date;

  @DeleteDateColumn()
  @Field(() => String, {
    nullable: true,
  })
  deletedAt?: Date;
}
