import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from 'src/commons/dto/pagination.dto';
import { CreateStoreInput } from './dto/create.store.dto';
import { UpdateStoreInput } from './dto/update.store.dto';
import { Store } from './entities/store.entity';
import { StoresService } from './stores.service';

@Resolver('Store')
export class StoresResolver {
  constructor(private readonly storesService: StoresService) {}

  @Mutation(() => Store, {
    name: 'createStore',
    description: 'Create a store',
  })
  public async createStore(
    @Args('createStoreInput') createStoreInput: CreateStoreInput,
  ) {
    return await this.storesService.create(createStoreInput);
  }

  @Query(() => [Store], {
    name: 'stores',
    description: 'Find all stores',
  })
  public async stores(
    @Args('paginationInput', {
      nullable: true,
    })
    paginationInput?: PaginationInput,
  ) {
    return await this.storesService.findAll(paginationInput);
  }

  @Query(() => Store, {
    name: 'store',
    description: 'Find one store by id',
  })
  public async store(@Args('id') id: string) {
    return await this.storesService.findOneById(id);
  }

  @Query(() => Store, {
    name: 'searchStore',
    description: 'Find one store by name',
  })
  public async searchStore() {
    return await this.storesService.findOneByName(name);
  }

  @Mutation(() => Store, {
    name: 'updateStore',
    description: 'Update a store',
  })
  public async updateStore(
    @Args('updateStoreInput') updateStoreInput: UpdateStoreInput,
  ): Promise<Store> {
    return await this.storesService.update(updateStoreInput);
  }

  @Mutation(() => Boolean, {
    name: 'deleteStore',
    description: 'Delete a store',
  })
  public async deleteStore(@Args('id') id: string): Promise<boolean> {
    return await this.storesService.delete(id);
  }
}
