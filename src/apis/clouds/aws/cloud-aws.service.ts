import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

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
  public async getObjectFromS3(
    fileKey: string,
  ): Promise<AWS.Request<AWS.S3.GetObjectOutput, AWS.AWSError>> {
    return new AWS.S3().getObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    });
  }

  public async getObjectArrayFromS3(
    fileKeyArray: string[],
  ): Promise<AWS.Request<AWS.S3.GetObjectOutput, AWS.AWSError>[]> {
    return fileKeyArray.map((fileKey) => {
      return new AWS.S3().getObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
      });
    });
  }
}
