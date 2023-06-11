import { Inject, Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { CreateTumblerRecordInput } from './dto/create.tumbler-record.dto';
import {
  CreateTumblerRecordTransactionInput,
  CreateTumblerRecordWithCreateStoreInput,
} from './dto/create.tumbler-record.transaction.dto';
import { SearchTumblerRecordInput } from './dto/search.tumbler-record.dto';
import { TumblerRecordsOutput } from './dto/tumbler-record.dto';
import { TumblerRecord } from './entities/tumbler-record.entity';
import {
  TUMBLER_RECORDS_REPOSITORY,
  TumblerRecordsRepository,
} from './interfaces/tumbler-records.repostitory';
import CreateTumblerRecordTransaction from './transactions/create.tumbler-record.transaction';

@Injectable()
export class TumblerRecordsService {
  constructor(
    @Inject(TUMBLER_RECORDS_REPOSITORY)
    private readonly repository: TumblerRecordsRepository,
    private readonly createTransaction: CreateTumblerRecordTransaction,
  ) {}

  public async create(
    createTumblerRecordInput: CreateTumblerRecordInput,
    user: User,
  ): Promise<TumblerRecord> {
    const newTumblerRecord = this.repository.create({
      ...createTumblerRecordInput,

      user,
    });
    return this.repository.save(newTumblerRecord);
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
    return this.createTransaction.run(transactionInput);
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
    user: User,
    searchTumblerRecordInput?: SearchTumblerRecordInput,
  ): Promise<TumblerRecordsOutput> {
    const getSearched = this.repository.search(searchTumblerRecordInput, user);
    const getAll = this.repository.find({
      where: { user },
    });

    const [searchedTumbler, allTumbler] = await Promise.all([
      getSearched,
      getAll,
    ]);

    const totalDiscount: number = allTumbler.reduce(
      (acc: number, cur: TumblerRecord) => acc + (cur.prices || 0),
      0,
    );

    const totalUsedTumbler: number = allTumbler.length;

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
