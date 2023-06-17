import { Field, InputType } from '@nestjs/graphql';
import { SearchInput } from 'src/infrastructures/database/search/dto/search.dto';
import { Store } from '../entities/store.entity';
import { StoreField } from '../enums/store-field.enum';

@InputType()
export class SearchStoreInput extends SearchInput<Store> {
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
