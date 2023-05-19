import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateSpace } from './entities/private-space.entity';
import { PrivateSpacesResolver } from './private-spaces.resolver';
import { PrivateSpacesService } from './private-spaces.service';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateSpace])],
  providers: [PrivateSpacesResolver, PrivateSpacesService],
  exports: [PrivateSpacesService],
})
export class PrivateSpacesModule {}
