import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FranchisesResolver } from 'src/presentations/resolvers/franchise.resolver';
import { Franchise } from './entities/franchise.entity';
import { FranchisesService } from './franchises.service';

@Module({
  imports: [TypeOrmModule.forFeature([Franchise])],
  providers: [FranchisesService, FranchisesResolver],
  exports: [FranchisesService],
})
export class FranchisesModule {}
