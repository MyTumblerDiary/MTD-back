import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationInput } from 'src/commons/pagination/dto/pagination.dto';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateStoreInput } from './dto/create.store.dto';
import { OrderStoreInput } from './dto/order.store.dto';
import { SearchStoreInput } from './dto/search.store.dto';
import { UpdateStoreInput } from './dto/update.store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  public async create(input: CreateStoreInput): Promise<Store> {
    return await this.storeRepository.save(this.storeRepository.create(input));
  }

  public async findAll(
    paginationInput: PaginationInput,
    searchStoreInput: SearchStoreInput,
    orderStoreInput: OrderStoreInput,
  ): Promise<Store[]> {
    const qb = this.storeRepository.createQueryBuilder('store');
    const paginatedQb = await this.findByPaginationQb(
      paginationInput.page,
      paginationInput.limit,
      qb,
    );
    const searchedQb = await this.findBySearchQb(searchStoreInput, paginatedQb);
    const orderedQb = await this.findByOrderQb(orderStoreInput, searchedQb);

    return orderedQb.getMany();
  }

  public async findOneById(id: string): Promise<Store> {
    return await this.storeRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(input: UpdateStoreInput): Promise<Store> {
    return await this.storeRepository.save(input);
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.storeRepository.softDelete(id);
    return result.affected ? true : false;
  }

  private async findByPaginationQb(
    page: number,
    limit: number,
    qb: SelectQueryBuilder<Store>,
  ): Promise<SelectQueryBuilder<Store>> {
    qb.skip((page - 1) * limit);
    qb.take(limit);
    return qb;
  }

  private async findBySearchQb(
    searchStoreInput: SearchStoreInput,
    qb: SelectQueryBuilder<Store>,
  ): Promise<SelectQueryBuilder<Store>> {
    return qb.andWhere(
      `store.${searchStoreInput.searchBy} LIKE :searchKeyword`,
      {
        searchKeyword: `%${searchStoreInput.value}%`,
      },
    );
  }

  private async findByOrderQb(
    orderStoreInput: OrderStoreInput,
    qb: SelectQueryBuilder<Store>,
  ) {
    return qb.orderBy(
      `store.${orderStoreInput.orderBy}`,
      orderStoreInput.orderDirection,
    );
  }
}
