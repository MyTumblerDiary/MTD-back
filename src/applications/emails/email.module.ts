import { Module } from '@nestjs/common';
import { EmailResolver } from 'src/presentations/resolvers/email.resolver';
import { CloudAwsModule } from '../../infrastructures/clouds/aws/cloud-aws.module';
import { UserModule } from '../users/users.module';
import { EmailService } from './email.service';

@Module({
  imports: [UserModule, CloudAwsModule],
  providers: [EmailService, EmailResolver],
  exports: [EmailService],
})
export class EmailModule {}
