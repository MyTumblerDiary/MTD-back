import { InputType } from '@nestjs/graphql';
import { SearchInput } from 'src/infrastructures/database/search/dto/search.dto';
import { Franchise } from '../entities/franchise.entity';

@InputType()
export class SearchFranchiseInput extends SearchInput<Franchise> {}
