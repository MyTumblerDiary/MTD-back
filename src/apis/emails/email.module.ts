import { Module } from '@nestjs/common';
import { CloudAwsModule } from '../clouds/aws/cloud-aws.module';
import { UserModule } from '../users/users.module';
import { EmailResolver } from './email.resolver';
import { EmailService } from './email.service';

@Module({
  imports: [UserModule, CloudAwsModule],
  providers: [EmailService, EmailResolver],
  exports: [EmailService],
})
export class EmailModule {}
