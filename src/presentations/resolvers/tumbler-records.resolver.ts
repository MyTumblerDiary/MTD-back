import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserAuth } from 'src/applications/auth/interfaces/user-auth';
import { CreateTumblerRecordInput } from 'src/applications/tumbler-records/dto/create.tumbler-record.dto';
import { CreateTumblerRecordWithCreateStoreInput } from 'src/applications/tumbler-records/dto/create.tumbler-record.transaction.dto';
import { DateArrangedTumblerRecordOutput } from 'src/applications/tumbler-records/dto/date-arranged.tumbler-record.dto';
import { FindWithOptionsTumblerRecordInput } from 'src/applications/tumbler-records/dto/find-with-qb.tumbler-record.input';
import { TumblerRecord } from 'src/applications/tumbler-records/entities/tumbler-record.entity';
import { TumblerRecordsService } from 'src/applications/tumbler-records/tumbler-records.service';
import { GqlAuthAccessGuard } from 'src/infrastructures/auth/gql-auth.guard';
import { CurrentUser } from 'src/infrastructures/auth/gql-user.param';
import { PaginatedTumblerRecordOutput } from '../../applications/tumbler-records/dto/paginate.tumbler-record.dto';

@Resolver('TumblerRecord')
export class TumblerRecordResolver {
  constructor(private readonly tumblerRecordsService: TumblerRecordsService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => TumblerRecord, {
    description: '텀블러 기록을 생성합니다. ',
  })
  public async createTumblerRecord(
    @CurrentUser('userAuth') userAuth: UserAuth,
    @Args('input')
    input: CreateTumblerRecordWithCreateStoreInput,
  ): Promise<TumblerRecord> {
    return this.tumblerRecordsService.createWithTransaction(input, userAuth);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => TumblerRecord, {
    description: '개인 공간에서의 텀블러 기록을 생성합니다. ',
  })
  public async createTumblerRecordOnPrivateSpace(
    @CurrentUser('user') user: UserAuth,
    @Args('input')
    input: CreateTumblerRecordInput,
  ) {
    return await this.tumblerRecordsService.create(input, user);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => PaginatedTumblerRecordOutput, {
    description: `특정 유저의 페이지네이션 된 텀블러 기록을 가져옵니다.`,
  })
  public async tumblerRecords(
    @CurrentUser('userAuth') userAuth: UserAuth,
    @Args('input', {
      nullable: true,
    })
    input: FindWithOptionsTumblerRecordInput,
  ): Promise<PaginatedTumblerRecordOutput> {
    return await this.tumblerRecordsService.findWithPaginate(input, userAuth);
  }

  @Query(() => DateArrangedTumblerRecordOutput, {
    description: '특정 유저의 텀블러 기록을 날짜별로 정리하여 가져옵니다.',
  })
  public async tumblerRecordsArrangedByDate(
    @CurrentUser('userAuth') userAuth: UserAuth,
  ): Promise<DateArrangedTumblerRecordOutput> {
    return await this.tumblerRecordsService.findByDate(userAuth, new Date());
  }

  @Query(() => TumblerRecord, {
    description: '텀블러 기록을 하나 가져옵니다.',
  })
  public async tumblerRecord(@Args('id') id: string): Promise<TumblerRecord> {
    return await this.tumblerRecordsService.findOne(id);
  }

  @Mutation(() => TumblerRecord, {
    description: '텀블러 기록을 수정합니다.',
  })
  public async updateTumblerRecord(
    @Args('id') id: string,
    @Args('updateTumblerRecordInput')
    updateTumblerRecordInput: CreateTumblerRecordInput,
  ): Promise<TumblerRecord> {
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
