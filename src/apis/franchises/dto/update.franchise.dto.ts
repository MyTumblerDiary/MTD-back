import { InputType, PartialType } from '@nestjs/graphql';
import { CreateFranchiseInput } from './create.franchise.dto';

@InputType()
export class UpdateFranchiseInput extends PartialType(CreateFranchiseInput) {}
