import { Module } from '@nestjs/common';
import { progressService } from './progress.service';
import { progressController } from './progress.controller';

@Module({
  providers: [progressService],
  controllers: [progressController]
})
export class progressesModule {}
