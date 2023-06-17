import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationInput } from 'src/infrastructures/database/pagination/dto/pagination.dto';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateStoreInput } from './dto/create.store.dto';
import { OrderStoreInput } from './dto/order.store.dto';
import { SearchStoreInput } from './dto/search.store.dto';
import { StoresOutput } from './dto/store.dto';
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
  ): Promise<StoresOutput> {
    const qb = this.storeRepository.createQueryBuilder('store');
    const searchedQb = await this.findBySearchQb(searchStoreInput, qb);
    const paginatedQb = await this.findByPaginationQb(
      paginationInput.page,
      paginationInput.limit,
      searchedQb,
    );
    const orderedQb = await this.findByOrderQb(orderStoreInput, paginatedQb);

    const stores = await orderedQb.getMany();
    const totalCount = await this.storeRepository.count();
    const searchedCount = await searchedQb.getCount();
    const pagesCount = Math.ceil(searchedCount / paginationInput.limit);
    const currentPage = paginationInput.page;

    return {
      stores,
      totalCount,
      pagesCount,
      currentPage,
      searchedCount,
    };
  }

  public async findOneById(id: string): Promise<Store> {
    try {
      return await this.storeRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error('존재하지 않는 공간입니다.');
    }
  }

  public async findManyByIds(ids: string[]): Promise<Store[]> {
    return await this.storeRepository.find({
      where: {
        id: In(ids),
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
