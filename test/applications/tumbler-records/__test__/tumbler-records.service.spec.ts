import { Test, TestingModule } from '@nestjs/testing';
import { UserAuth } from 'src/applications/auth/interfaces/user-auth';
import { CreateStoreInput } from 'src/applications/stores/dto/create.store.dto';
import { CreateTumblerRecordInput } from 'src/applications/tumbler-records/dto/create.tumbler-record.dto';
import { CreateTumblerRecordTransactionInput } from 'src/applications/tumbler-records/dto/create.tumbler-record.transaction.dto';
import { TUMBLER_RECORDS_REPOSITORY } from 'src/applications/tumbler-records/interfaces/tumbler-records.repostitory';
import CreateTumblerRecordTransaction from 'src/applications/tumbler-records/transactions/create.tumbler-record.transaction';
import { TumblerRecordsService } from 'src/applications/tumbler-records/tumbler-records.service';
import { UserService } from 'src/applications/users/users.service';
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
        {
          provide: UserService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
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
              user: input.userAuth,
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
    let userAuth: UserAuth;
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

      userAuth = {
        id: 'test',
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
          userAuth,
        };

      // when
      const result = await service.createWithTransaction(
        createTumblerRecordTransactionInput,
        userAuth,
      );

      // then
      expect(result).toEqual(
        mockBuilder.build({
          ...createTumblerRecordInput,
          store: createStoreInput,
          user: userAuth,
        }),
      );
    });
  });
});
