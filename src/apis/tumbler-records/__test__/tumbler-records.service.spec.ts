import { Test, TestingModule } from '@nestjs/testing';
import { StoresModule } from 'src/apis/stores/stores.module';
import CreateTumblerRecordTransaction from '../transactions/create.tumbler-record.transaction';
import { TumblerRecordsService } from '../tumbler-records.service';

describe('TumblerRecordsService', () => {
  let service: TumblerRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [StoresModule],
      providers: [
        TumblerRecordsService,
        CreateTumblerRecordTransaction,
        {
          provide: 'TUMBLER_RECORDS_REPOSITORY',
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
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
