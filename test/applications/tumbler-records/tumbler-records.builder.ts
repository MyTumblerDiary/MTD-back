import { TumblerRecord } from 'src/domains/tumbler-records/entities/tumbler-record.entity';
import { DeepPartial } from 'typeorm';
import { MockBuilder } from '../../mock.builder';
export class TumblerRecordBuilder implements MockBuilder<TumblerRecord> {
  build(data: DeepPartial<TumblerRecord>): TumblerRecord {
    return new TumblerRecord(data);
  }

  buildMany(data: DeepPartial<TumblerRecord>[]): TumblerRecord[] {
    return data.map((d) => new TumblerRecord(d));
  }
}
