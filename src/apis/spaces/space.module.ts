import { Module } from '@nestjs/common';
import { PrivateSpacesModule } from './private-spaces/private-spaces.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [PrivateSpacesModule, StoresModule],
  exports: [PrivateSpacesModule, StoresModule],
})
export class SpaceModule {}
