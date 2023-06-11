import { InputType, PartialType } from '@nestjs/graphql';
import { CreateStoreInput } from './create.store.dto';

@InputType()
export class UpdateStoreInput extends PartialType(CreateStoreInput) {}
