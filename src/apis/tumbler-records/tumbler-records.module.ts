import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/users.module';
import { TumblerRecord } from './entities/tumbler-record.entity';
import { TumblerRecordResolver } from './tumbler-records.resolver';
import { TumblerRecordsService } from './tumbler-records.service';

@Module({
  imports: [TypeOrmModule.forFeature([TumblerRecord]), UserModule],
  providers: [TumblerRecordsService, TumblerRecordResolver],
  exports: [],
})
export class TumblerRecordsModule {}
