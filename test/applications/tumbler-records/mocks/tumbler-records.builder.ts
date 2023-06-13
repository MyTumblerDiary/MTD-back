import { CreateTumblerRecordInput } from 'src/applications/tumbler-records/dto/create.tumbler-record.dto';
import { TumblerRecord } from 'src/applications/tumbler-records/entities/tumbler-record.entity';
import { uuid } from 'src/commons/utils/functions';
import { MockBuilder } from 'test/mock.builder';
import { DeepPartial } from 'typeorm';

export class TumblerRecordBuilder implements MockBuilder<TumblerRecord> {
  public build(data: DeepPartial<TumblerRecord>): TumblerRecord {
    return new TumblerRecord(data);
  }

  public buildMany(data: DeepPartial<TumblerRecord>[]): TumblerRecord[] {
    return data.map((d) => new TumblerRecord(d));
  }

  public buildMockTumblerRecord(): TumblerRecord {
    return this.build({
      id: uuid(),
      prices: 1000,
      memo: `test-memo`,
      imageFileKey: Math.random().toString(36).substring(7),
      placeType: 'STORE',
      usedAt: `2023-01-01`,
    });
  }

  public buildMockCreateTumblerRecordInput(): CreateTumblerRecordInput {
    return {
      prices: 1000,
      memo: `test-memo`,
      imageFileKey: Math.random().toString(36).substring(7),
      placeType: 'STORE',
      usedAt: `2023-01-01`,
    };
  }
}
