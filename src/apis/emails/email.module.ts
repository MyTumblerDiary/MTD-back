import { CacheModule, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailResolver } from './email.resolver';
import { UserService } from '../users/users.service';
import { UserResolver } from '../users/users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [EmailService, EmailResolver, UserService, UserResolver],
  exports: [EmailService],
})
export class EmailModule {}
