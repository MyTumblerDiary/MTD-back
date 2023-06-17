import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateModule } from 'src/common/utils/date/date.module';
import { TumblerRecordResolver } from 'src/presentations/resolvers/tumbler-records.resolver';
import { StoresModule } from '../stores/stores.module';
import { UserModule } from '../users/users.module';
import { TumblerRecord } from './entities/tumbler-record.entity';
import { TUMBLER_RECORDS_REPOSITORY } from './interfaces/tumbler-records.repostitory';
import CreateTumblerRecordTransaction from './transactions/create.tumbler-record.transaction';
import { TumblerRecordHelper } from './tumbler-records.helper';
import { TumblerRecordsTypeOrmRepository } from './tumbler-records.repository';
import { TumblerRecordsService } from './tumbler-records.service';

@Module({
  imports: [
    StoresModule,
    TypeOrmModule.forFeature([TumblerRecord]),
    UserModule,
    DateModule,
  ],
  providers: [
    TumblerRecordsService,
    TumblerRecordResolver,
    TumblerRecordHelper,
    CreateTumblerRecordTransaction,
    {
      provide: TUMBLER_RECORDS_REPOSITORY,
      useClass: TumblerRecordsTypeOrmRepository,
    },
  ],
  exports: [TumblerRecordsService],
})
export class TumblerRecordsModule {}
