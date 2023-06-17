import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { UserAuth } from '../auth/interfaces/user-auth';
import { CreateTumblerRecordInput } from './dto/create.tumbler-record.dto';
import { FindWithOptionsTumblerRecordInput } from './dto/find-with-qb.tumbler-record.input';
import { OrderTumblerRecordInput } from './dto/order.tumbler-record.dto';
import { PaginateTumblerRecordInput } from './dto/paginate.tumbler-record.dto';
import { SearchTumblerRecordInput } from './dto/search.tumbler-record.dto';
import { UpdateTumblerRecordInput } from './dto/update.tumbler-record.dto';
import { TumblerRecord } from './entities/tumbler-record.entity';

@Injectable()
export class TumblerRecordsTypeOrmRepository {
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

  public async findByUserIdWithQb(
    findInput: FindWithOptionsTumblerRecordInput,
    user: UserAuth,
  ): Promise<[TumblerRecord[], number]> {
    const { paginateInput, searchInput, orderInput } = findInput;
    const qb = this.selectQueryBuilder();
    if (paginateInput) this.paginateQb(paginateInput, qb);
    if (searchInput) this.searchQb(searchInput, user, qb);
    if (orderInput) this.orderQb(orderInput, qb);

    const [tumblerRecords, totalCount] = await qb.getManyAndCount();

    return [tumblerRecords, totalCount];
  }

  private selectQueryBuilder(): SelectQueryBuilder<TumblerRecord> {
    return this.tumblerRecordsRepository.createQueryBuilder('tumblerRecord');
  }

  private paginateQb(
    paginateInput: PaginateTumblerRecordInput,
    qb: SelectQueryBuilder<TumblerRecord>,
  ): SelectQueryBuilder<TumblerRecord> {
    const { page, limit } = paginateInput;
    qb.skip((page - 1) * limit);
    qb.take(limit);
    return qb;
  }

  private searchQb(
    searchInput: SearchTumblerRecordInput,
    user: UserAuth,
    qb: SelectQueryBuilder<TumblerRecord>,
  ): SelectQueryBuilder<TumblerRecord> {
    const { searchBy, value } = searchInput;

    qb.where('tumblerRecord.user_id = :user_id', { userId: user.id });

    if (searchBy) {
      qb.where(`tumblerRecord.${searchBy} = :value`, { value });
    }
    return qb;
  }

  private orderQb(
    orderInput: OrderTumblerRecordInput,
    qb: SelectQueryBuilder<TumblerRecord>,
  ): SelectQueryBuilder<TumblerRecord> {
    const { orderBy, orderDirection } = orderInput;
    qb.orderBy(`tumblerRecord.${orderBy}`, orderDirection);
    return qb;
  }
}
