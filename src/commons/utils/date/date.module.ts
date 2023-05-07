import { Module } from '@nestjs/common';
import { DateProvider } from './date.provider';

@Module({
  providers: [DateProvider],
  exports: [DateProvider],
})
export class DateModule {}
