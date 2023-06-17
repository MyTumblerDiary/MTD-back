import { registerEnumType } from '@nestjs/graphql';

export enum TumblerRecordField {
  ID = 'id',
  PRICES = 'prices',
  MEMO = 'memo',
  USED_AT = 'used_at',
  PLACE_TYPE = 'place_type',
  IMAGE_FILE_KEY = 'image_file_key',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
}

registerEnumType(TumblerRecordField, {
  name: 'TumblerRecordField',
  description: '텀블러 기록 필드 타입',
});
