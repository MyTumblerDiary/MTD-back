import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { UserAuth } from '../auth/interfaces/user-auth';
import { CreateTumblerRecordInput } from './dto/create.tumbler-record.dto';
import { SearchTumblerRecordInput } from './dto/search.tumbler-record.dto';
import { UpdateTumblerRecordInput } from './dto/update.tumbler-record.dto';
import { TumblerRecord } from './entities/tumbler-record.entity';
import { TumblerRecordsRepository } from './interfaces/tumbler-records.repostitory';

@Injectable()
export class TumblerRecordsTypeOrmRepository
  implements TumblerRecordsRepository
{
  constructor(
    @InjectRepository(TumblerRecord)
    private readonly tumblerRecordsRepository: Repository<TumblerRecord>,
  ) {}

  public create(input: CreateTumblerRecordInput): TumblerRecord {
    return this.tumblerRecordsRepository.create(input);
  }

  public createMany(inputs: CreateTumblerRecordInput[]): TumblerRecord[] {
    return this.tumblerRecordsRepository.create(inputs);
  }

  public async save(data: TumblerRecord): Promise<TumblerRecord> {
    return await this.tumblerRecordsRepository.save(data);
  }

  public async find(options?: FindManyOptions): Promise<TumblerRecord[]> {
    return await this.tumblerRecordsRepository.find(options);
  }

  public async findByUserId(id: string): Promise<TumblerRecord[]> {
    return this.tumblerRecordsRepository.find({
      where: {
        user: {
          id,
        },
      },
    });
  }

  public async findOne(options: FindOneOptions): Promise<TumblerRecord | null> {
    return this.tumblerRecordsRepository.findOne(options);
  }

  public async findOneOrFail(options: FindOneOptions): Promise<TumblerRecord> {
    return await this.tumblerRecordsRepository.findOneOrFail(options);
  }

  public async search(
    searchInput: SearchTumblerRecordInput,
    user: UserAuth,
  ): Promise<TumblerRecord[]> {
    const { searchBy, value } = searchInput;
    const queryBuilder =
      this.tumblerRecordsRepository.createQueryBuilder('tumblerRecord');

    queryBuilder.where('tumblerRecord.user_id = :user_id', { userId: user.id });

    if (searchBy) {
      queryBuilder.where(`tumblerRecord.${searchBy} = :value`, { value });
    }
    return queryBuilder.getMany();
  }

  public async update(
    id: string,
    updateTumblerRecordInput: UpdateTumblerRecordInput,
  ): Promise<TumblerRecord> {
    await this.tumblerRecordsRepository.update(id, updateTumblerRecordInput);
    return await this.findOneOrFail({ where: { id } });
  }

  public async softDelete(id: string): Promise<boolean> {
    const softDeleteResult = await this.tumblerRecordsRepository.softDelete(id);
    return softDeleteResult.affected === 1;
  }

  public async delete(id: string): Promise<boolean> {
    const deleteResult = await this.tumblerRecordsRepository.delete(id);
    return deleteResult.affected === 1;
  }
}
