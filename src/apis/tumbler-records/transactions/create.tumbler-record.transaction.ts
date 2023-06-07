import { Injectable } from '@nestjs/common';
import { Franchise } from 'src/apis/franchises/entities/franchise.entity';
import { CreateStoreInput } from 'src/apis/stores/dto/create.store.dto';
import { Store } from 'src/apis/stores/entities/store.entity';
import { BaseTransaction } from 'src/commons/transactions/base-transaction';
import { DataSource, EntityManager } from 'typeorm';
import { TumblerRecord } from '../entities/tumbler-record.entity';
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

    await this.checkExistFranchise(manager, data.createStoreInput);

    const tumblerRecord = await manager.save(
      TumblerRecord,
      manager.create(TumblerRecord, {
        ...data.createTumblerRecordInput,
        user: data.user,
        placeType: 'CAFE',
        store,
      }),
    );
    return manager.findOneOrFail(TumblerRecord, {
      where: {
        id: tumblerRecord.id,
      },
      relations: {
        store: {
          franchise: true,
        },
        user: true,
      },
    });
  }

  private async checkExistFranchise(
    manager: EntityManager,
    createStoreInput: CreateStoreInput,
  ): Promise<void> {
    if (!createStoreInput?.franchiseId) {
      return;
    }
    try {
      await manager.findOneOrFail(Franchise, {
        where: {
          id: createStoreInput.franchiseId,
        },
      });
    } catch (error) {
      throw new Error('존재하지 않는 프랜차이즈입니다.');
    }
  }
}
