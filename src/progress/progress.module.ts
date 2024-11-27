import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { Progress, ProgressSchema } from './progress.schema'; // Import your Progress model and schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Progress.name, schema: ProgressSchema }]), // Register Progress model here
  ],
  providers: [ProgressService],
  controllers: [ProgressController],
})
export class ProgressesModule {}
 