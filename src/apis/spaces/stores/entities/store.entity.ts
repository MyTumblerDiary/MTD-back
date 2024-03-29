import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { TumblerRecord } from 'src/apis/tumbler-records/entities/tumbler-record.entity';
import { CommonEntity } from 'src/commons/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
@InputType('StoreInputType', { isAbstract: true })
@ObjectType({ description: '가게 Entity' })
export class Store extends CommonEntity {
  @Column({
    nullable: false,
    unique: true,
  })
  @Field(() => String, {
    nullable: false,
    description: '가게 이름입니다. ',
  })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  @Field(() => Int, {
    nullable: false,
    description: '해당 가게에서의 텀블러 할인 가격입니다. ',
  })
  discountPrice: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  @Field(() => String, {
    nullable: false,
    description: '가게의 도로명 주소입니다. ',
  })
  streetNameAddress: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  @Field(() => String, {
    nullable: false,
    description: '가게의 지번 주소입니다. ',
  })
  lotNumberAddress: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  @Field(() => String, {
    nullable: false,
    description: '가게의 상세 주소입니다. ',
  })
  detailAddress: string;

  @Column({
    nullable: false,
  })
  @Field(() => Float, {
    nullable: false,
    description: '가게의 위도입니다. ',
  })
  latitude: number;

  @Column({
    nullable: false,
  })
  @Field(() => Float, {
    nullable: false,
    description: '가게의 경도입니다. ',
  })
  longitude: number;

  @Column({
    nullable: true,
  })
  @Field(() => String, {
    nullable: true,
    description: 'AWS S3 버킷에 저장되는 가게의 대표 이미지 파일키 입니다. ',
  })
  imageFileKey?: string;

  @OneToMany(() => TumblerRecord, (tumblerRecords) => tumblerRecords.store)
  @Field(() => [TumblerRecord], {
    nullable: true,
    description: '가게의 텀블러 기록들입니다. ',
  })
  tumblerRecords?: TumblerRecord[];
}
