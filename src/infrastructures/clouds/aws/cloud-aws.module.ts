import { Module } from '@nestjs/common';
import { EnvConfigModule } from 'src/infrastructures/env-config/env-config.module';
import { CloudAwsResolver } from './cloud-aws.resolver';
import { CloudAwsService } from './cloud-aws.service';

@Module({
  imports: [EnvConfigModule],
  providers: [CloudAwsService, CloudAwsResolver],
  exports: [CloudAwsService],
})
export class CloudAwsModule {}
