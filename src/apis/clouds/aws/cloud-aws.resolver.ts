import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CloudAwsService } from './cloud-aws.service';
import {
  S3PresignedUrlInput,
  S3PresignedUrlOutput,
} from './dto/s3-presigned-url.dto';

@Resolver('CloudAws')
export class CloudAwsResolver {
  constructor(private readonly cloudAwsService: CloudAwsService) {}

  /**
   * Presigned Url 발급
   * @returns UrlOutput
   */
  @Mutation(() => S3PresignedUrlOutput, {
    description: 'Presigned URL을 받습니다.',
  })
  @UseGuards(GqlAuthAccessGuard)
  async getPresignedUrl(
    @Args('presignedUrlInput') presignedUrlInput: S3PresignedUrlInput,
  ): Promise<S3PresignedUrlOutput> {
    return this.cloudAwsService.getS3PresignedUrl(presignedUrlInput);
  }
}
