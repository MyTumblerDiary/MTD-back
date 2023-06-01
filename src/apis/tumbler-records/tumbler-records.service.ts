import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { StoresService } from '../spaces/stores/stores.service';
import { User } from '../users/entities/user.entity';
import { CreateTumblerRecordInput } from './dto/create.tumbler-record.dto';
import { TumblerRecord } from './entities/tumbler-record.entity';
import CreateTumblerRecordTransaction from './transactions/create.tumbler-record.transaction';
import { CreateTumblerRecordTransactionInput } from './transactions/dto/create.tumbler-record.transaction.dto';

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
  ) {
    const newTumblerRecord = this.tumblerRecordsRepository.create({
      ...createTumblerRecordInput,
      user,
    });
    return await this.tumblerRecordsRepository.save(newTumblerRecord);
  }

  public async createWithStoreId(
    createTumblerRecordInput: CreateTumblerRecordInput,
    user: User,
  ) {
    if (!createTumblerRecordInput.storeId) {
      throw new Error('storeId가 없습니다.');
    }
    await this.storesService.findOneById(createTumblerRecordInput.storeId);
    return await this.create(createTumblerRecordInput, user);
  }

  public async createWithTransaction(
    input: CreateTumblerRecordTransactionInput,
    user: User,
  ) {
    input.user = user;
    return await this.createTransaction.run(input);
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

  public async findByUserId({ id }: User): Promise<TumblerRecord[]> {
    return await this.tumblerRecordsRepository.find({
      where: {
        user: {
          id,
        },
      },
    });
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
