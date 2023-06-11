import { Inject, Injectable } from '@nestjs/common';
import { StoresService } from '../stores/stores.service';
import { User } from '../users/entities/user.entity';
import { CreateTumblerRecordInput } from './dto/create.tumbler-record.dto';
import { SearchTumblerRecordInput } from './dto/search.tumbler-record.dto';
import { TumblerRecordsOutput } from './dto/tumbler-record.dto';
import { TumblerRecord } from './entities/tumbler-record.entity';
import {
  TUMBLER_RECORDS_REPOSITORY,
  TumblerRecordsRepository,
} from './interfaces/tumbler-records.repostitory';
import CreateTumblerRecordTransaction from './transactions/create.tumbler-record.transaction';
import {
  CreateTumblerRecordTransactionInput,
  CreateTumblerRecordWithCreateStoreInput,
} from './transactions/dto/create.tumbler-record.transaction.dto';

@Injectable()
export class TumblerRecordsService {
  constructor(
    @Inject(TUMBLER_RECORDS_REPOSITORY)
    private readonly repository: TumblerRecordsRepository,
    private readonly createTransaction: CreateTumblerRecordTransaction,
    private readonly storesService: StoresService,
  ) {}

  public async create(
    createTumblerRecordInput: CreateTumblerRecordInput,
    user: User,
  ): Promise<TumblerRecord> {
    const newTumblerRecord = this.repository.create({
      ...createTumblerRecordInput,
      user,
    });
    return await this.repository.save(newTumblerRecord);
  }

  public async createWithStoreId(
    createTumblerRecordInput: CreateTumblerRecordInput,
    user: User,
  ): Promise<TumblerRecord> {
    if (!createTumblerRecordInput.storeId) {
      throw new Error('storeId가 없습니다.');
    }
    await this.storesService.findOneById(createTumblerRecordInput.storeId);
    return await this.create(createTumblerRecordInput, user);
  }

  public async createWithTransaction(
    input: CreateTumblerRecordWithCreateStoreInput,
    user: User,
  ): Promise<TumblerRecord> {
    const transactionInput: CreateTumblerRecordTransactionInput = {
      createTumblerRecordInput: input.createTumblerRecordInput,
      createStoreInput: input.createStoreInput,
      user,
    };

    return await this.createTransaction.run(transactionInput);
  }

  public async findAll(relations?: string[]): Promise<TumblerRecord[]> {
    return await this.repository.find({
      relations,
    });
  }

  public async findOne(
    id: string,
    relations?: string[],
  ): Promise<TumblerRecord> {
    return await this.repository.findOne({
      where: { id },
      relations,
    });
  }

  public async findByUserId(
    { id }: User,
    searchTumblerRecordInput?: SearchTumblerRecordInput,
  ): Promise<TumblerRecordsOutput> {
    const tumblers: TumblerRecord[] = await this.repository.find({
      where: { user: { id } },
      relations: ['user'],
    });

    const totalUsedTumbler: number = tumblers.length;

    const totalDiscount: number = tumblers.reduce(
      (acc, cur) => acc + (cur.prices || 0),
      0,
    );

    if (!searchTumblerRecordInput) {
      return {
        tumblerRecords: tumblers,
        totalDiscount,
        totalUsedTumbler,
        filteredTumbler: totalUsedTumbler,
        filteredDiscount: totalDiscount,
      };
    }

    const searchedTumbler: TumblerRecord[] = await this.search(
      searchTumblerRecordInput,
    );

    const filteredDiscount: number = searchedTumbler.reduce(
      (acc: number, cur: TumblerRecord) => acc + (cur.prices || 0),
      0,
    );

    const filteredTumbler: number = searchedTumbler.length;

    return {
      tumblerRecords: searchedTumbler,
      totalDiscount,
      totalUsedTumbler,
      filteredTumbler,
      filteredDiscount,
    };
  }

  public async search(
    searchTumblerRecordInput: SearchTumblerRecordInput,
  ): Promise<TumblerRecord[]> {
    return this.repository.search(searchTumblerRecordInput);
  }

  public async update(
    id: string,
    updateTumblerRecordInput: CreateTumblerRecordInput,
  ): Promise<TumblerRecord> {
    return this.repository.update(id, updateTumblerRecordInput);
  }

  public async delete(id: string): Promise<boolean> {
    return this.repository.softDelete(id);
  }
}
