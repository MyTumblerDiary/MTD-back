import { Test, TestingModule } from '@nestjs/testing';
import { StoresModule } from 'src/domains/stores/stores.module';
import { StoresService } from 'src/domains/stores/stores.service';
import { TUMBLER_RECORDS_REPOSITORY } from 'src/domains/tumbler-records/tumbler-records.module';
import CreateTumblerRecordTransaction from '../../../src/domains/tumbler-records/transactions/create.tumbler-record.transaction';
import { TumblerRecordsService } from '../../../src/domains/tumbler-records/tumbler-records.service';
import { MockTumblerRecordsTypeOrmRepository } from './mocks/mock.tumbler-records.repository';

describe('TumblerRecordsService', () => {
  let service: TumblerRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TumblerRecordsService,
        CreateTumblerRecordTransaction,
        {
          provide: TUMBLER_RECORDS_REPOSITORY,
          useValue: MockTumblerRecordsTypeOrmRepository,
        },
        {
          provide: StoresService,
          useValue: {
            findOneById: jest.fn(),
            findManyByIds: jest.fn(),
          },
        },
      ],
    })
      .overrideProvider(StoresModule)
      .useFactory({
        factory: () => ({
          findOneById: jest.fn(),
          findManyByIds: jest.fn(),
        }),
      })
      .overrideProvider(CreateTumblerRecordTransaction)
      .useFactory({
        factory: () => ({
          run: jest.fn(),
        }),
      })

      .compile();

    service = module.get<TumblerRecordsService>(TumblerRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
