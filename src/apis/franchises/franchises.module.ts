import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Franchise } from './entities/franchise.entity';
import { FranchisesResolver } from './franchise.resolver';
import { FranchisesService } from './franchises.service';

@Module({
  imports: [TypeOrmModule.forFeature([Franchise])],
  providers: [FranchisesService, FranchisesResolver],
  exports: [FranchisesService],
})
export class FranchisesModule {}
