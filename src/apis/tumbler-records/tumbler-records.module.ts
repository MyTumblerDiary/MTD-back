import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TumblerRecord } from './entities/tumbler-record.entity';
import { TumblerRecordsService } from './tumbler-records.service';

@Module({
  imports: [TypeOrmModule.forFeature([TumblerRecord])],
  providers: [TumblerRecordsService],
  exports: [],
})
export class TumblerRecordsModule {}
