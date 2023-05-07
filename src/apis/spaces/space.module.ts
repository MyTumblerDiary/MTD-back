import { Module } from '@nestjs/common';
import { PrivateSpacesModule } from './private-spaces/private-spaces.module';
import { PrivateSpacesService } from './private-spaces/private-spaces.service';
import { StoresModule } from './stores/stores.module';
import { StoresService } from './stores/stores.service';

@Module({
  imports: [PrivateSpacesModule, StoresModule],
  exports: [PrivateSpacesService, StoresService],
})
export class SpaceModule {}
