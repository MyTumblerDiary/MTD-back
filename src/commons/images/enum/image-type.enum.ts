import { registerEnumType } from '@nestjs/graphql';

export enum ImageType {
  JPG = 'jpg',
  PNG = 'png',
  GIF = 'gif',
  WEBP = 'webp',
  SVG = 'svg',
  TIFF = 'tiff',
  BMP = 'bmp',
  ICO = 'ico',
}

registerEnumType(ImageType, {
  name: 'ImageType',
  description: '이미지 타입',
});
