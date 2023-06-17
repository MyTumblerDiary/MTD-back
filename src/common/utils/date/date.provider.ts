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

  public createMapWithDateKeys<T>(year: number, month: number) {
    const daysInMonth = this.getDaysInMonth(year, month);
    const map = new Map<number, T[]>();
    for (let i = 1; i <= daysInMonth; i++) {
      map.set(i, []);
    }
  }

  public getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
  }
}
