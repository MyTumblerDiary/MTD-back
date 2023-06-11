import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from 'src/infrastructures/database/pagination/dto/pagination.dto';
import { CreateStoreInput } from '../applications/stores/dto/create.store.dto';
import { OrderStoreInput } from '../applications/stores/dto/order.store.dto';
import { SearchStoreInput } from '../applications/stores/dto/search.store.dto';
import { StoresOutput } from '../applications/stores/dto/store.dto';
import { UpdateStoreInput } from '../applications/stores/dto/update.store.dto';
import { Store } from '../applications/stores/entities/store.entity';
import { StoresService } from '../applications/stores/stores.service';

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

  @Query(() => StoresOutput, {
    name: 'stores',
    description: 'Find all stores',
  })
  public async stores(
    @Args('paginationInput', {
      nullable: true,
    })
    paginationInput: PaginationInput = new PaginationInput(),
    @Args('searchStoreInput', {
      nullable: true,
    })
    searchStoreInput: SearchStoreInput = new SearchStoreInput(),
    @Args('orderStoreInput', {
      nullable: true,
    })
    orderStoreInput: OrderStoreInput = new OrderStoreInput(),
  ): Promise<StoresOutput> {
    return await this.storesService.findAll(
      paginationInput,
      searchStoreInput,
      orderStoreInput,
    );
  }

  @Query(() => Store, {
    name: 'store',
    description: 'Find one store by id',
  })
  public async store(@Args('id') id: string) {
    return await this.storesService.findOneById(id);
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
