import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { progressService } from './progress.service';
import { progressController } from './progress.controller';
import { Progress, ProgressSchema } from './progress.schema'; // Import your Progress model and schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Progress.name, schema: ProgressSchema }]), // Register Progress model here
  ],
  providers: [progressService],
  controllers: [progressController],
})
export class ProgressesModule {}
