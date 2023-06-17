import { Field, InputType } from '@nestjs/graphql';

@InputType({
  isAbstract: true,
})
export abstract class SearchInput<T> {
  @Field(() => String, { nullable: true, description: '검색할 필드입니다. ' })
  searchBy: string;

  @Field(() => String, { nullable: true, description: '검색할 값입니다. ' })
  value = '';
}
