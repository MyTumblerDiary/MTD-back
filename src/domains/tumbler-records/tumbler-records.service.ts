import { Inject, Injectable } from '@nestjs/common';
import { UserAuth } from '../auth/interfaces/user-auth';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/users.service';
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
    private readonly userService: UserService,
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
    return await this.repository.findOneOrFail({
      where: { id },
      relations,
    });
  }

  public async findByUserId(
    user: UserAuth,
    searchTumblerRecordInput?: SearchTumblerRecordInput,
  ): Promise<TumblerRecordsOutput> {
    // searchTumblerRecordInput이 없으면 모든 텀블러 기록과 총 누적 할인 금액, 총 할인 횟수를 가져옵니다.
    const totalResult = await this.repository.findByUserId(user.id);

    if (!searchTumblerRecordInput) {
      return {
        tumblerRecords: totalResult,
        totalDiscount: await this.accumulateDiscount(totalResult),
        totalUsedTumbler: totalResult.length,
      };
    }

    // searchTumblerRecordInput이 있으면 검색된 텀블러 기록과 총 누적 할인 금액, 총 할인 횟수를 가져옵니다.
    const searchedResult: TumblerRecord[] = await this.repository.search(
      searchTumblerRecordInput,
      user,
    );

    return {
      tumblerRecords: searchedResult,
      totalDiscount: await this.accumulateDiscount(totalResult),
      totalUsedTumbler: totalResult.length,
      filteredDiscount: await this.accumulateDiscount(searchedResult),
      filteredTumbler: searchedResult.length,
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
