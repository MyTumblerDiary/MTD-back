import { Field, InputType } from '@nestjs/graphql';
import { SearchInput } from 'src/infrastructures/database/search/dto/search.dto';

export enum SearchTumblerRecordBy {
  ID = 'id',
  PRICE = 'price',
  MEMO = 'memo',
  USED_AT = 'usedAt',
  PLACE_TYPE = 'placeType',
  IMAGE_FILE_KEY = 'imageFileKey',
}

@InputType()
export class SearchTumblerRecordInput extends SearchInput {
  @Field(() => String, {
    nullable: true,
    description:
      '검색할 필드입니다. TumblerRecord Entity에 포함된 필드만 검색 가능합니다.(Snake case로 넣어주어야 합니다. ))',
  })
  searchBy: string;

  @Field(() => String, {
    nullable: true,
    description: '검색할 값입니다. ',
  })
  value = '';
}
