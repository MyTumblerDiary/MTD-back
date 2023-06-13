import { registerEnumType } from '@nestjs/graphql';

export enum StoreField {
  ID = 'id',
  NAME = 'name',
  DISCOUNT_PRICE = 'discount_price',
  STREET_NAME_ADDRESS = 'street_name_address',
  LOT_NUMBER_ADDRESS = 'lot_number_address',
  DETAIL_ADDRESS = 'detail_address',
  LATITUDE = 'latitude',
  LONGITUDE = 'longitude',
  IMAGE_FILE_KEY = 'image_file_key',
}

registerEnumType(StoreField, {
  name: 'StoreField',
  description: 'Store Entity에 포함된 필드입니다.',
});
