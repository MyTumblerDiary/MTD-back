import { Field, InputType } from '@nestjs/graphql';
import { SearchInput } from 'src/commons/search/dto/search.dto';
import { StoreField } from '../enums/store-field.enum';

@InputType()
export class SearchStoreInput extends SearchInput {
  constructor() {
    super();
  }

  @Field(() => StoreField, {
    nullable: true,
    defaultValue: StoreField.NAME,
    description: '가게에서 검색할 기준 필드를 선택합니다. ',
  })
  searchBy: StoreField = StoreField.NAME;
}
