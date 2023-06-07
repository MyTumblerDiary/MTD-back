import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Store } from '../stores/entities/store.entity';
import { StoresService } from '../stores/stores.service';
import { User } from '../users/entities/user.entity';
import { CreateTumblerRecordInput } from './dto/create.tumbler-record.dto';
import { SearchTumblerRecordInput } from './dto/search.tumbler-record.dto';
import { TumblerRecordsOutput } from './dto/tumbler-record.dto';
import { TumblerRecord } from './entities/tumbler-record.entity';
import CreateTumblerRecordTransaction from './transactions/create.tumbler-record.transaction';
import {
  CreateTumblerRecordTransactionInput,
  CreateTumblerRecordWithCreateStoreInput,
} from './transactions/dto/create.tumbler-record.transaction.dto';

@Injectable()
export class TumblerRecordsService {
  constructor(
    @InjectRepository(TumblerRecord)
    private readonly tumblerRecordsRepository: Repository<TumblerRecord>,
    private readonly createTransaction: CreateTumblerRecordTransaction,
    private readonly storesService: StoresService,
  ) {}

  public async create(
    createTumblerRecordInput: CreateTumblerRecordInput,
    user: User,
  ): Promise<TumblerRecord> {
    const newTumblerRecord = this.tumblerRecordsRepository.create({
      ...createTumblerRecordInput,
      user,
    });
    return await this.tumblerRecordsRepository.save(newTumblerRecord);
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
    return await this.tumblerRecordsRepository.find({
      relations,
    });
  }

  public async findOne(
    id: string,
    relations?: string[],
  ): Promise<TumblerRecord> {
    return await this.tumblerRecordsRepository.findOne({
      where: { id },
      relations,
    });
  }

  public async findByUserId(
    { id }: User,
    searchTumblerRecordInput: SearchTumblerRecordInput,
  ): Promise<TumblerRecordsOutput> {
    const searchedTumbler: TumblerRecord[] = await this.search(
      searchTumblerRecordInput,
    );

    const filteredDiscount: number = searchedTumbler.reduce(
      (acc: number, cur: TumblerRecord) => acc + (cur.prices || 0),
      0,
    );

    const filteredTumbler: number = searchedTumbler.length;

    const tumblers: TumblerRecord[] = await this.tumblerRecordsRepository.find({
      where: { user: { id } },
      relations: ['user'],
    });

    const totalDiscount: number = tumblers.reduce(
      (acc, cur) => acc + (cur.prices || 0),
      0,
    );

    const totalUsedTumbler: number = tumblers.length;

    const mostVisitedStore: TumblerRecord[] =
      await this.tumblerRecordsRepository
        .createQueryBuilder('tumblerRecord')
        .select('tumblerRecord.storeId')
        .addSelect('COUNT(tumblerRecord.storeId)', 'count')
        .where('tumblerRecord.userId = :id', { id })
        .groupBy('tumblerRecord.storeId')
        .orderBy('count', 'DESC')
        .limit(1)
        .getRawMany();

    return {
      tumblerRecords: tumblers,
      totalDiscount,
      totalUsedTumbler,
      filteredTumbler,
      filteredDiscount,
    };
  }

  public async mostVisitedStore({ id }: User, limit = 1): Promise<Store[]> {
    const mostVisitedStoreIds: string[] = await this.tumblerRecordsRepository
      .createQueryBuilder('tumblerRecord')
      .select('tumblerRecord.storeId')
      .addSelect('COUNT(tumblerRecord.storeId)', 'count')
      .where('tumblerRecord.userId = :id', { id })
      .groupBy('tumblerRecord.storeId')
      .orderBy('count', 'DESC')
      .limit(1)
      .getRawMany();

    return this.storesService.findManyByIds(mostVisitedStoreIds);
  }

  public async search(
    searchTumblerRecordInput: SearchTumblerRecordInput,
  ): Promise<TumblerRecord[]> {
    const { searchBy, value } = searchTumblerRecordInput;
    const tumblerRecords = await this.tumblerRecordsRepository.find({
      where: { [searchBy]: value },
    });
    return tumblerRecords;
  }

  public async update(
    id: string,
    updateTumblerRecordInput: CreateTumblerRecordInput,
  ): Promise<boolean> {
    const result: UpdateResult = await this.tumblerRecordsRepository.update(
      id,
      updateTumblerRecordInput,
    );
    return result.affected === 1;
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.tumblerRecordsRepository.softDelete(id);
    return result.affected === 1;
  }
}
