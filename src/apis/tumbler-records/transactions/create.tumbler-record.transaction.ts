import { Injectable } from '@nestjs/common';
import { Store } from 'src/apis/spaces/stores/entities/store.entity';
import { BaseTransaction } from 'src/commons/transactions/base-transaction';
import { DataSource, EntityManager } from 'typeorm';
import { PlaceType, TumblerRecord } from '../entities/tumbler-record.entity';
import { CreateTumblerRecordTransactionInput } from './dto/create.tumbler-record.transaction.dto';

@Injectable()
export default class CreateTumblerRecordTransaction extends BaseTransaction<
  CreateTumblerRecordTransactionInput,
  TumblerRecord
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }
  protected async execute(
    data: CreateTumblerRecordTransactionInput,
    manager: EntityManager,
  ): Promise<TumblerRecord> {
    const store = await manager.save(
      Store,
      manager.create(Store, data.createStoreInput),
    );

    const tumblerRecord = await manager.save(
      TumblerRecord,
      manager.create(TumblerRecord, {
        ...data.createTumblerRecordInput,
        user: data.user,
        placeType: PlaceType.STORE,
        store,
      }),
    );

    return tumblerRecord;
  }
}