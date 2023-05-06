import { Module } from '@nestjs/common';
import { CloudAwsResolver } from './cloud-aws.resolver';
import { CloudAwsService } from './cloud-aws.service';

@Module({
  providers: [CloudAwsService, CloudAwsResolver],
  exports: [CloudAwsService],
})
export class CloudAwsModule {}
