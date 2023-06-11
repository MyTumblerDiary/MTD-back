import { DeepPartial } from 'typeorm';

export interface MockBuilder<T> {
  build(data: DeepPartial<T>): T;

  buildMany(data: DeepPartial<T>[]): T[];
}
