import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresResolver } from 'src/presentations/resolvers/stores.resolver';
import { FranchisesModule } from '../franchises/franchises.module';
import { Store } from './entities/store.entity';
import { StoresService } from './stores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store]), FranchisesModule],
  providers: [StoresResolver, StoresService],
  exports: [StoresService],
})
export class StoresModule {}
