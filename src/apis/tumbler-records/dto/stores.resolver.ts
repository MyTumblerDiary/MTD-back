import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStoreInput } from 'src/apis/spaces/stores/dto/create.store.dto';
import { OrderStoreInput } from 'src/apis/spaces/stores/dto/order.store.dto';
import { SearchStoreInput } from 'src/apis/spaces/stores/dto/search.store.dto';
import { UpdateStoreInput } from 'src/apis/spaces/stores/dto/update.store.dto';
import { Store } from 'src/apis/spaces/stores/entities/store.entity';
import { StoresService } from 'src/apis/spaces/stores/stores.service';
import { PaginationInput } from 'src/commons/pagination/dto/pagination.dto';

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
    paginationInput: PaginationInput = new PaginationInput(),
    @Args('searchStoreInput', {
      nullable: true,
    })
    searchStoreInput: SearchStoreInput = new SearchStoreInput(),
    @Args('orderStoreInput', {
      nullable: true,
    })
    orderStoreInput: OrderStoreInput = new OrderStoreInput(),
  ) {
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
