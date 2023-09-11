import { Module } from '@nestjs/common';
import { LiderService } from './lider.service';

@Module({
  providers: [LiderService]
})
export class LiderModule {}
