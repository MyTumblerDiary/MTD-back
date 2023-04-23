import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationInput } from 'src/commons/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateStoreInput } from './dto/create.store.dto';
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

  public async findAll(paginationInput?: PaginationInput): Promise<Store[]> {
    if (!paginationInput) {
      return await this.storeRepository.find();
    }
    const { page, limit } = paginationInput;
    return await this.findAllWithPagination(page, limit);
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

  private async findAllWithPagination(
    page: number,
    limit: number,
  ): Promise<Store[]> {
    return await this.storeRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
