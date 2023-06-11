import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TumblerRecordResolver } from '../../presentations/tumbler-records.resolver';
import { StoresModule } from '../stores/stores.module';
import { TumblerRecord } from './entities/tumbler-record.entity';
import { TUMBLER_RECORDS_REPOSITORY } from './interfaces/tumbler-records.repostitory';
import CreateTumblerRecordTransaction from './transactions/create.tumbler-record.transaction';
import { TumblerRecordsTypeOrmRepository } from './tumbler-records.repository';
import { TumblerRecordsService } from './tumbler-records.service';

@Module({
  imports: [StoresModule, TypeOrmModule.forFeature([TumblerRecord])],
  providers: [
    TumblerRecordsService,
    TumblerRecordResolver,
    CreateTumblerRecordTransaction,
    {
      provide: TUMBLER_RECORDS_REPOSITORY,
      useClass: TumblerRecordsTypeOrmRepository,
    },
  ],
  exports: [TumblerRecordsService],
})
export class TumblerRecordsModule {}
export { TUMBLER_RECORDS_REPOSITORY };
