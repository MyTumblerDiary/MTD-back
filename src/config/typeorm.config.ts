import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const ENV = process.env.NODE_ENV;
dotenv.config({
  path: path.join(__dirname, `../../config/.${ENV}.env`),
});

export const ormOption: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  logger: 'file',
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  charset: 'utf8mb4',
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../migrations/**/*{.ts,.js}')],
  migrationsTableName: 'migrations',
  extra: {
    connectionLimit: 10, // Maximum number of connections in pool
    queueLimit: 0, // Maximum number of waiting clients
    waitForConnections: true, // If true, the pool will queue the connection requests
  },
};
