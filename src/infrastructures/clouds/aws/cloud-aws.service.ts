import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import * as mimeTypes from 'mime-types';

import { uuid } from 'src/common/utils/functions';
import {
  S3PresignedUrlInput,
  S3PresignedUrlOutput,
} from './dto/s3-presigned-url.dto';

@Injectable()
export class CloudAwsService {
  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      signatureVersion: 'v4',
    });
  }

  ses(): AWS.SES {
    return new AWS.SES();
  }

  s3(): AWS.S3 {
    return new AWS.S3();
  }

  cloudFront(): AWS.CloudFront {
    return new AWS.CloudFront();
  }

  getContentType(filename: string) {
    const contentType = mimeTypes.lookup(filename);
    return contentType || '';
  }

  async getS3PresignedUrl(
    presignedUrlInput: S3PresignedUrlInput,
  ): Promise<S3PresignedUrlOutput> {
    const fileKey = uuid() + presignedUrlInput.fileName;
    const presignedUrl = this.s3().getSignedUrl('putObject', {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: fileKey,
      ContentType: this.getContentType(presignedUrlInput.type),
      Expires: 3 * 60 * 60,
    });
    return {
      presignedUrl,
      fileKey,
    };
  }

  public async getObjectFromS3(
    fileKey: string,
  ): Promise<AWS.Request<AWS.S3.GetObjectOutput, AWS.AWSError>> {
    return new AWS.S3().getObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
    });
  }

  public async getObjectArrayFromS3(
    fileKeyArray: string[],
  ): Promise<AWS.Request<AWS.S3.GetObjectOutput, AWS.AWSError>[]> {
    return fileKeyArray.map((fileKey) => {
      return new AWS.S3().getObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileKey,
      });
    });
  }
}
