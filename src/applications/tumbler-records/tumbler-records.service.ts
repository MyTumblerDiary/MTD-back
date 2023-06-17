import { Inject, Injectable } from '@nestjs/common';
import { UserAuth } from '../auth/interfaces/user-auth';
import { UserService } from '../users/users.service';

import { CreateTumblerRecordInput } from './dto/create.tumbler-record.dto';
import {
  CreateTumblerRecordTransactionInput,
  CreateTumblerRecordWithCreateStoreInput,
} from './dto/create.tumbler-record.transaction.dto';
import { FindWithOptionsTumblerRecordInput } from './dto/find-with-qb.tumbler-record.input';

import { DateArrangedTumblerRecordOutput } from './dto/date-arranged.tumbler-record.dto';
import { PaginatedTumblerRecordOutput } from './dto/paginate.tumbler-record.dto';
import { TumblerRecord } from './entities/tumbler-record.entity';
import {
  TUMBLER_RECORDS_REPOSITORY,
  TumblerRecordsRepository,
} from './interfaces/tumbler-records.repostitory';
import CreateTumblerRecordTransaction from './transactions/create.tumbler-record.transaction';
import { TumblerRecordHelper } from './tumbler-records.helper';

@Injectable()
export class TumblerRecordsService {
  constructor(
    @Inject(TUMBLER_RECORDS_REPOSITORY)
    private readonly repository: TumblerRecordsRepository,
    private readonly createTransaction: CreateTumblerRecordTransaction,
    private readonly userService: UserService,
    private readonly tumblerRecordHelper: TumblerRecordHelper,
  ) {}

  public async create(
    createTumblerRecordInput: CreateTumblerRecordInput,
    userAuth: UserAuth,
  ): Promise<TumblerRecord> {
    const user = await this.userService.findOneByEmail(userAuth.email);
    const newTumblerRecord = this.repository.create({
      ...createTumblerRecordInput,
      user,
    });
    return this.repository.save(newTumblerRecord);
  }

  public async createWithTransaction(
    input: CreateTumblerRecordWithCreateStoreInput,
    userAuth: UserAuth,
  ): Promise<TumblerRecord> {
    const transactionInput: CreateTumblerRecordTransactionInput = {
      createTumblerRecordInput: input.createTumblerRecordInput,
      createStoreInput: input.createStoreInput,
      userAuth,
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
    return await this.repository.findOneOrFail({
      where: { id },
      relations,
    });
  }

  public async findByDate(
    userAuth: UserAuth,
    nowDate: Date,
  ): Promise<DateArrangedTumblerRecordOutput> {
    const tumblerRecords = await this.repository.findByUserId(userAuth.id);
    return this.tumblerRecordHelper.getArrangedByDateTumblerRecords(
      tumblerRecords,
      nowDate,
    );
  }

  public async findWithPaginate(
    findOptions: FindWithOptionsTumblerRecordInput,
    userAuth: UserAuth,
  ): Promise<PaginatedTumblerRecordOutput> {
    const [tumblerRecords, totalCount] =
      await this.repository.findByUserIdWithQb(findOptions, userAuth);

    const totalPages: number = Math.ceil(
      totalCount / findOptions.paginateInput.limit,
    );

    return {
      tumblerRecords,
      totalCount,
      currentCount: tumblerRecords.length,
      currentPage: findOptions.paginateInput.page,
      totalPages,
    };
  }

  private async accumulateDiscount(tumblerRecords: TumblerRecord[]) {
    return tumblerRecords.reduce((acc: number, cur: TumblerRecord) => {
      if (cur.prices) {
        return acc + cur.prices;
      }
      return acc;
    }, 0);
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
