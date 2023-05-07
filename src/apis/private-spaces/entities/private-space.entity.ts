import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/commons/entities/common.entity';
import { Space } from 'src/commons/interfaces/space.interface';
import { Column, Entity } from 'typeorm';

@Entity()
@InputType('PrivateSpaceInputType', { isAbstract: true })
@ObjectType()
export class PrivateSpace extends CommonEntity implements Space {
  @Field(() => String, {
    description: '개인 공간 이름입니다. ',
  })
  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: '개인 공간의 도로명 주소입니다. ',
  })
  streetNameAddress: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  @Field(() => String, {
    nullable: false,
    description: '개인 공간의 지번 주소입니다. ',
  })
  lotNumberAddress: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  @Field(() => String, {
    nullable: false,
    description: '개인 공간의 상세 주소입니다. ',
  })
  detailAddress: string;

  @Column({
    nullable: false,
  })
  @Field(() => Float, {
    nullable: false,
    description: '개인 공간의 위도입니다. ',
  })
  latitude: number;

  @Column({
    nullable: false,
  })
  @Field(() => Float, {
    nullable: false,
    description: '개인 공간의 경도입니다. ',
  })
  longitude: number;

  @Column({
    nullable: true,
  })
  @Field(() => String, {
    nullable: true,
    description:
      'AWS S3 버킷에 저장되는 개인 공간의 대표 이미지 파일키 입니다. ',
  })
  imageFileKey?: string;
}
