import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTumblerRecordInput } from './dto/create.tumbler-record.dto';
import { TumblerRecord } from './entities/tumbler-record.entity';
import { TumblerRecordsService } from './tumbler-records.service';

@Resolver()
export class TumblerRecordResolver {
  constructor(private readonly tumblerRecordsService: TumblerRecordsService) {}

  @Mutation(() => TumblerRecord, {
    description: '텀블러 기록을 생성합니다.',
  })
  public async createTumblerRecord(
    @Args('createTumblerRecordInput')
    createTumblerRecordInput: CreateTumblerRecordInput,
  ): Promise<TumblerRecord> {
    return await this.tumblerRecordsService.create(createTumblerRecordInput);
  }

  @Query(() => [TumblerRecord], {
    description: '텀블러 기록을 모두 가져옵니다.',
  })
  public async tumblerRecords(): Promise<TumblerRecord[]> {
    return await this.tumblerRecordsService.findAll();
  }

  @Query(() => TumblerRecord, {
    description: '텀블러 기록을 하나 가져옵니다.',
  })
  public async tumblerRecord(@Args('id') id: string): Promise<TumblerRecord> {
    return await this.tumblerRecordsService.findOne(id);
  }

  @Query(() => [TumblerRecord], {
    description: '유저의 텀블러 기록을 모두 가져옵니다.',
  })
  public async tumblerRecordsByUserId(
    @Args('userId') userId: string,
  ): Promise<TumblerRecord[]> {
    return await this.tumblerRecordsService.findByUserId(userId);
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
