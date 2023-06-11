import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { RefreshToken } from 'src/domains/auth/entities/refreshToken.entity';
import { SocialLoginType } from 'src/domains/auth/interfaces/social.interface';
import { TumblerRecord } from 'src/domains/tumbler-records/entities/tumbler-record.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../../../infrastructures/database/entities/common.entity';

@InputType('UserInputType', { isAbstract: true })
@Entity({ name: 'users' })
@ObjectType({ description: '유저 Entity' })
export class User extends CommonEntity {
  @Column({ unique: true, nullable: false })
  @IsEmail()
  @Field(() => String, {
    description: '이메일',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 120,
  })
  @Field(() => String, {
    description: '비밀번호입니다. ',
    nullable: true,
  })
  @Exclude()
  password?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 20,
  })
  @Field(() => String, {
    description: '닉네임은 최대 20자까지만 가능합니다. ',
    nullable: true,
  })
  nickname?: string;

  @Column({ default: 'local', nullable: true })
  @Field(() => String, {
    description: 'local, google, kakao, apple 중 하나입니다. ',
  })
  social?: SocialLoginType;

  @Field(() => [TumblerRecord], {
    description: '유저가 가지고 있는 텀블러 기록들입니다. ',
    nullable: true,
  })
  @OneToMany(() => TumblerRecord, (tumblerRecord) => tumblerRecord.user)
  tumblerRecords?: TumblerRecord[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens?: RefreshToken[];
}
