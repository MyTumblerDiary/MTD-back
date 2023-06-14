import { Injectable } from '@nestjs/common';

@Injectable()
export class DateProvider {
  public getNow(): Date {
    return new Date();
  }

  public getToday(): Date {
    return new Date();
  }

  public convertDateToYYMMDD(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
