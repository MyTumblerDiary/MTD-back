import { registerEnumType } from '@nestjs/graphql';

export enum StoreField {
  ID = 'id',
  NAME = 'name',
  DISCOUNT_PRICE = 'discountPrice',
  STREET_NAME_ADDRESS = 'streetNameAddress',
  LOT_NUMBER_ADDRESS = 'lotNumberAddress',
  DETAIL_ADDRESS = 'detailAddress',
  LATITUDE = 'latitude',
  LONGITUDE = 'longitude',
  IMAGE_FILE_KEY = 'imageFileKey',
}

registerEnumType(StoreField, {
  name: 'StoreField',
  description: 'Store Entity에 포함된 필드입니다.',
});
