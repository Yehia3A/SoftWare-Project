import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizResult, QuizResultSchema } from './quiz-results.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: QuizResult.name, schema: QuizResultSchema }]),
  ],
})
export class QuizResultsModule {}