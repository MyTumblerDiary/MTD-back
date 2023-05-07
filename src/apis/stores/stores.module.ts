import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FranchisesModule } from '../franchises/franchises.module';
import { Store } from './entities/store.entity';
import { StoresResolver } from './stores.resolver';
import { StoresService } from './stores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store]), FranchisesModule],
  providers: [StoresResolver, StoresService],
  exports: [StoresService],
})
export class StoresModule {}
