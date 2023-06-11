import { Injectable } from '@nestjs/common';
import { Franchise } from 'src/domains/franchises/entities/franchise.entity';
import { CreateStoreInput } from 'src/domains/stores/dto/create.store.dto';
import { Store } from 'src/domains/stores/entities/store.entity';
import { BaseTransaction } from 'src/infrastructures/database/transactions/base-transaction';
import { DataSource, EntityManager } from 'typeorm';
import { CreateTumblerRecordTransactionInput } from '../dto/create.tumbler-record.transaction.dto';
import { TumblerRecord } from '../entities/tumbler-record.entity';

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
    await this.checkExistFranchise(manager, data.createStoreInput);

    const store = await this.findOrCreateStore(manager, data.createStoreInput);

    return manager.save(
      manager.create(TumblerRecord, {
        ...data.createTumblerRecordInput,
        store,
        user: data.user,
      }),
    );
  }

  private async checkExistFranchise(
    manager: EntityManager,
    createStoreInput: CreateStoreInput,
  ): Promise<Franchise | null> {
    if (!createStoreInput?.franchiseId) {
      return;
    }
    try {
      return manager.findOneOrFail(Franchise, {
        where: {
          id: createStoreInput.franchiseId,
        },
      });
    } catch (error) {
      throw new Error('존재하지 않는 프랜차이즈입니다.');
    }
  }

  private async findOrCreateStore(
    manager: EntityManager,
    createStoreInput: CreateStoreInput,
  ): Promise<Store> {
    const { kakaoUId } = createStoreInput;
    const store = await manager.findOne(Store, {
      where: {
        kakaoUId,
      },
    });
    if (store) {
      return store;
    }

    // 존재하지 않는다면 새로 생성합니다.
    return manager.save(manager.create(Store, createStoreInput));
  }
}
