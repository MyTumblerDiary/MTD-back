import { Injectable } from '@nestjs/common';
import { DateProvider } from '../../common/utils/date/date.provider';
import {
  DateArrangedTumblerRecordOutput,
  DateUnitTumblerRecordOutput,
} from './dto/date-arranged.tumbler-record.dto';
import { TumblerRecord } from './entities/tumbler-record.entity';

@Injectable()
export class TumblerRecordHelper {
  constructor(private readonly dateProvider: DateProvider) {}

  public getArrangedByDateTumblerRecords(
    tumblerRecords: TumblerRecord[],
    nowDate: Date,
  ): DateArrangedTumblerRecordOutput {
    const tumblerRecordsMap: Map<number, TumblerRecord[]> =
      this.tumblerRecordsMap(tumblerRecords, nowDate);

    const dateUnitTumblerRecordOutputs: DateUnitTumblerRecordOutput[] = [];
    tumblerRecordsMap.forEach((tumblerRecords, day) => {
      const sumOfdiscountedPrice = tumblerRecords.reduce(
        (acc: number, tumblerRecord: TumblerRecord) => {
          if (tumblerRecord.prices) {
            return acc + tumblerRecord.prices;
          }
          return acc;
        },
        0,
      );

      dateUnitTumblerRecordOutputs.push({
        day,
        countOfTumblerRecords: tumblerRecords.length,
        sumOfdiscountedPrice,
        value: tumblerRecords,
      });
    });

    return {
      tumblerRecordsMap: dateUnitTumblerRecordOutputs,
    };
  }

  private tumblerRecordsMap(
    tumblerRecords: TumblerRecord[],
    nowDate: Date,
  ): Map<number, TumblerRecord[]> {
    const map = new Map<number, TumblerRecord[]>() as Map<
      number,
      TumblerRecord[]
    >;
    const daysInMonth = this.dateProvider.getDaysInMonth(
      nowDate.getFullYear(),
      nowDate.getMonth() + 1,
    );

    for (let i = 1; i <= daysInMonth; i++) {
      map.set(i, []);
    }
    tumblerRecords.forEach((tumblerRecord) => {
      // tumblerRecord.usedAt의 끝 두 자리가 일자이다.
      const day = Number(tumblerRecord.usedAt.toString().slice(-2)) as number;
      const previousArray = map.get(day) as TumblerRecord[];
      map.set(day, [...previousArray, tumblerRecord]);
    });

    return map;
  }
}
