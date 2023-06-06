import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { User } from '../users/entities/user.entity';
import {
  CreateTumblerRecordInput,
  CreateTumblerRecordOnPrivateSpaceInput,
} from './dto/create.tumbler-record.dto';
import { SearchTumblerRecordInput } from './dto/search.tumbler-record.dto';
import { TumblerRecordsOutput } from './dto/tumbler-record.dto';
import { TumblerRecord } from './entities/tumbler-record.entity';
import { CreateTumblerRecordTransactionInput } from './transactions/dto/create.tumbler-record.transaction.dto';
import { TumblerRecordsService } from './tumbler-records.service';

@Resolver('TumblerRecord')
export class TumblerRecordResolver {
  constructor(private readonly tumblerRecordsService: TumblerRecordsService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => TumblerRecord, {
    description: '이미 존재하는 공간에 대한 텀블러 기록을 생성합니다. ',
  })
  public async createTumblerRecordWithStoreId(
    @CurrentUser('user') user: User,
    @Args('input')
    input: CreateTumblerRecordInput,
  ): Promise<TumblerRecord> {
    return await this.tumblerRecordsService.createWithStoreId(input, user);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => TumblerRecord, {
    description: '새로운 공간에 대한 텀블러 기록을 생성합니다. ',
  })
  public async createTumblerRecordWithCreateStore(
    @CurrentUser('user') user: User,
    @Args('input')
    input: CreateTumblerRecordTransactionInput,
  ): Promise<TumblerRecord> {
    return await this.tumblerRecordsService.createWithTransaction(input, user);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => TumblerRecord, {
    description: '개인 공간에서의 텀블러 기록을 생성합니다. ',
  })
  public async createTumblerRecordOnPrivateSpace(
    @CurrentUser('user') user: User,
    @Args('input')
    input: CreateTumblerRecordOnPrivateSpaceInput,
  ) {
    return await this.tumblerRecordsService.create(input, user);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => TumblerRecordsOutput, {
    description: `유저의 모든 텀블러 사용 기록과 누적 할인 금액, 할인 횟수를 가져옵니다.
    이때, 검색 필터를 적용하면 검색된 텀블러 기록만 가져옵니다.`,
  })
  public async tumblerRecords(
    @CurrentUser('user') user: User,
    @Args('searchTumblerRecordInput')
    searchTumblerRecordInput?: SearchTumblerRecordInput,
  ): Promise<TumblerRecordsOutput> {
    return await this.tumblerRecordsService.findByUserId(
      user,
      searchTumblerRecordInput,
    );
  }

  @Query(() => TumblerRecord, {
    description: '텀블러 기록을 하나 가져옵니다.',
  })
  public async tumblerRecord(@Args('id') id: string): Promise<TumblerRecord> {
    return await this.tumblerRecordsService.findOne(id);
  }

  @Mutation(() => Boolean, {
    description: '텀블러 기록을 수정합니다.',
  })
  public async updateTumblerRecord(
    @Args('id') id: string,
    @Args('updateTumblerRecordInput')
    updateTumblerRecordInput: CreateTumblerRecordInput,
  ): Promise<boolean> {
    return await this.tumblerRecordsService.update(
      id,
      updateTumblerRecordInput,
    );
  }

  @Mutation(() => Boolean, {
    description: '텀블러 기록을 삭제합니다.',
  })
  public async deleteTumblerRecord(@Args('id') id: string): Promise<boolean> {
    return await this.tumblerRecordsService.delete(id);
  }
}
