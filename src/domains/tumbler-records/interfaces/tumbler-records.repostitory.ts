import { UserAuth } from 'src/domains/auth/interfaces/user-auth';
import { CustomRepository } from 'src/infrastructures/database/repositories/custom-repository';
import { DeepPartial } from 'typeorm';
import { SearchTumblerRecordInput } from '../dto/search.tumbler-record.dto';
import { TumblerRecord } from '../entities/tumbler-record.entity';

export interface TumblerRecordsRepository
  extends CustomRepository<TumblerRecord> {
  create(data: DeepPartial<TumblerRecord>): TumblerRecord;

  save(data: TumblerRecord): Promise<TumblerRecord>;

  find(options?: any): Promise<TumblerRecord[]>;

  findByUserId(id: string): Promise<TumblerRecord[]>;

  findOne(options: any): Promise<TumblerRecord | null>;

  findOneOrFail(options: any): Promise<TumblerRecord>;

  search(
    input: SearchTumblerRecordInput,
    user: UserAuth,
  ): Promise<TumblerRecord[]>;

  update(id: string, data: Partial<TumblerRecord>): Promise<TumblerRecord>;

  delete(id: string): Promise<boolean>;

  softDelete(id: string): Promise<boolean>;
}

export const TUMBLER_RECORDS_REPOSITORY = Symbol('TUMBLER_RECORDS_REPOSITORY');
