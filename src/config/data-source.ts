import { DataSource, DataSourceOptions } from 'typeorm';
import { ormOption } from './typeorm.config';

const dataSourceOptions = {
  ...ormOption,
} as DataSourceOptions;

export const dataSource: DataSource = new DataSource(dataSourceOptions);
