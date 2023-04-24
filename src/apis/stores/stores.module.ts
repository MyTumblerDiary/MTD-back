import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoresResolver } from './stores.resolver';
import { StoresService } from './stores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [StoresResolver, StoresService],
  exports: [StoresService],
})
export class StoresModule {}
