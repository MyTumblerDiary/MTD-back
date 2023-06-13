import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresModule } from '../stores/stores.module';
import { UserModule } from '../users/users.module';
import { TumblerRecord } from './entities/tumbler-record.entity';
import CreateTumblerRecordTransaction from './transactions/create.tumbler-record.transaction';
import { TumblerRecordResolver } from './tumbler-records.resolver';
import { TumblerRecordsService } from './tumbler-records.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TumblerRecord]),
    UserModule,
    StoresModule,
  ],
  providers: [
    TumblerRecordsService,
    TumblerRecordResolver,
    CreateTumblerRecordTransaction,
  ],
  exports: [],
})
export class TumblerRecordsModule {}
