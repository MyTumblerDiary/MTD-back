import { Test, TestingModule } from '@nestjs/testing';
import { CreateStoreInput } from 'src/domains/stores/dto/create.store.dto';
import { CreateTumblerRecordInput } from 'src/domains/tumbler-records/dto/create.tumbler-record.dto';
import { CreateTumblerRecordTransactionInput } from 'src/domains/tumbler-records/dto/create.tumbler-record.transaction.dto';
import CreateTumblerRecordTransaction from 'src/domains/tumbler-records/transactions/create.tumbler-record.transaction';
import { TUMBLER_RECORDS_REPOSITORY } from 'src/domains/tumbler-records/tumbler-records.module';
import { TumblerRecordsService } from 'src/domains/tumbler-records/tumbler-records.service';
import { User } from 'src/domains/users/entities/user.entity';
import { MockTumblerRecordsTypeOrmRepository } from '../mocks/mock.tumbler-records.repository';
import { TumblerRecordBuilder } from '../mocks/tumbler-records.builder';

describe('TumblerRecordsService', () => {
  let service: TumblerRecordsService;
  let mockBuilder: TumblerRecordBuilder;

  beforeEach(async () => {
    mockBuilder = new TumblerRecordBuilder();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TumblerRecordsService,
        CreateTumblerRecordTransaction,
        {
          provide: TUMBLER_RECORDS_REPOSITORY,
          useValue: MockTumblerRecordsTypeOrmRepository,
        },
      ],
    })
      .overrideProvider(CreateTumblerRecordTransaction)
      .useFactory({
        factory: () => ({
          run: (input: CreateTumblerRecordTransactionInput) =>
            mockBuilder.build({
              ...input.createTumblerRecordInput,
              store: input.createStoreInput,
              user: input.user,
            }),
        }),
      })
      .compile();

    service = module.get<TumblerRecordsService>(TumblerRecordsService);
  });

  it('서비스가 정의된다. ', () => {
    expect(service).toBeDefined();
  });

  describe('createWithTransaction', () => {
    let createTumblerRecordInput: CreateTumblerRecordInput;
    let createStoreInput: CreateStoreInput;
    let user: User;
    beforeEach(() => {
      createTumblerRecordInput = {
        prices: 1000,
        memo: 'test',
        imageFileKey: 'test_key.jpg',
        placeType: 'STORE',
        usedAt: `2023-01-01`,
      };

      createStoreInput = {
        name: 'test',
        discountPrice: 100,
        streetNameAddress: 'Test Street Name Address',
        lotNumberAddress: 'Test Lot Number Address',
        detailAddress: 'Test Detail Address',
        kakaoUId: 'test',
        latitude: 103.7,
        longitude: 114.5,
        imageFileKey: 'test_key.jpg',
      };

      user = {
        id: 'test user id',
        email: 'test@test.com',
      };
    });

    it('메서드가 정의된다. ', () => {
      expect(service.createWithTransaction).toBeDefined();
    });

    it('주어진 데이터로 올바르게 트랜잭션을 호출하고 결과값을 받아온다. ', async () => {
      // given
      const createTumblerRecordTransactionInput: CreateTumblerRecordTransactionInput =
        {
          createTumblerRecordInput,
          createStoreInput,
          user,
        };

      // when
      const result = await service.createWithTransaction(
        createTumblerRecordTransactionInput,
        user,
      );

      // then
      expect(result).toEqual(
        mockBuilder.build({
          ...createTumblerRecordInput,
          store: createStoreInput,
          user: user,
        }),
      );
    });
  });
});
