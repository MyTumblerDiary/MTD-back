import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { User } from '../users/entities/user.entity';
import { CreateTumblerRecordInput } from './dto/create.tumbler-record.dto';
import { TumblerRecord } from './entities/tumbler-record.entity';
import { TumblerRecordsService } from './tumbler-records.service';

@Resolver()
export class TumblerRecordResolver {
  constructor(private readonly tumblerRecordsService: TumblerRecordsService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => TumblerRecord, {
    description: '텀블러 기록을 생성합니다.',
  })
  public async createTumblerRecord(
    @CurrentUser('user') user: User,
    @Args('createTumblerRecordInput')
    createTumblerRecordInput: CreateTumblerRecordInput,
  ): Promise<TumblerRecord> {
    return await this.tumblerRecordsService.create(
      createTumblerRecordInput,
      user,
    );
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [TumblerRecord], {
    description: '유저의 모든 텀블러 기록을 모두 가져옵니다.',
  })
  public async tumblerRecords(
    @CurrentUser('user') user: User,
  ): Promise<TumblerRecord[]> {
    return await this.tumblerRecordsService.findByUserId(user);
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
