import { ConfigModuleOptions } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as path from 'path';

const ENV = process.env.NODE_ENV;
dotenv.config({
  path: path.join(__dirname, `../../config/.${ENV}.env`),
});

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: `config/.${ENV}.env`,
};
