import { Module } from '@nestjs/common';
import { PrivateSpacesResolver } from './private-spaces.resolver';
import { PrivateSpacesService } from './private-spaces.service';

@Module({
  providers: [PrivateSpacesResolver, PrivateSpacesService],
})
export class PrivateSpacesModule {}
