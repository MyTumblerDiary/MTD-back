import { Injectable } from '@nestjs/common';
import { SearchTumblerRecordInput } from 'src/domains/tumbler-records/dto/search.tumbler-record.dto';
import { TumblerRecord } from 'src/domains/tumbler-records/entities/tumbler-record.entity';
import { TumblerRecordsRepository } from '../../../../dist/domains/tumbler-records/interfaces/tumbler-records.repostitory';

@Injectable()
export class MockTumblerRecordsTypeOrmRepository
  implements TumblerRecordsRepository
{
  create(data: Partial<TumblerRecord>): TumblerRecord {
    return new TumblerRecord(data);
  }
  createMany(data: Partial<TumblerRecord>[]): TumblerRecord[] {
    return data.map((d) => new TumblerRecord(d));
  }

  save(data: TumblerRecord): Promise<TumblerRecord> {
    return new Promise((resolve, reject) => {
      resolve(new TumblerRecord(data));
      reject(new Error(`save tumblerRecord error`));
    });
  }
  find(options?: any): Promise<TumblerRecord[]> {
    return new Promise((resolve: any, reject) => {
      resolve([new TumblerRecord()]);
      reject(new Error(`find tumblerRecord error`));
    });
  }
  findOne(options?: any): Promise<TumblerRecord> {
    return new Promise((resolve: any, reject) => {
      resolve(new TumblerRecord());
      reject(new Error(`findOne tumblerRecord error`));
    });
  }
  findOneOrFail(options?: any): Promise<TumblerRecord> {
    return new Promise((resolve: any, reject) => {
      resolve(new TumblerRecord());
      reject(new Error(`findOneOrFail tumblerRecord error`));
    });
  }
  search(input?: SearchTumblerRecordInput): Promise<TumblerRecord[]> {
    return new Promise((resolve, reject) => {
      resolve([new TumblerRecord()]);
      reject(new Error(`search tumblerRecord error`));
    });
  }
  update(id: string, data: Partial<TumblerRecord>): Promise<TumblerRecord> {
    return new Promise((resolve, reject) => {
      resolve(new TumblerRecord({ id }));
      reject(new Error(`update tumblerRecord error`));
    });
  }
  delete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
      reject(new Error(`delete ${id} tumblerRecord error`));
    });
  }
  softDelete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
      reject(new Error(`softDelete tumblerRecord error`));
    });
  }
}
