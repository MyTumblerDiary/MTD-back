import { User } from 'aws-sdk/clients/appstream';
import { Store } from 'cache-manager';
import { PlaceType } from './entities/tumbler-record.entity';

export interface TumblerRecord {
  id: string;
  prices?: number;
  memo?: string;
  imageFileKey?: string;
  usedAt: string;
  placeType: PlaceType;
  user: User;
  store?: Store;
}
