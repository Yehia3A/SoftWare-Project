import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { Progress, ProgressSchema } from './progress.schema';
import { Rating, RatingSchema } from '../rating/rating.schema';
import { QuizResult, QuizResultSchema } from '../quiz-results/quiz-results.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Progress.name, schema: ProgressSchema },
      { name: Rating.name, schema: RatingSchema },
      { name: QuizResult.name, schema: QuizResultSchema },
    ]),
  ],
  providers: [ProgressService],
  controllers: [ProgressController],
  exports: [MongooseModule],
})
export class ProgressesModule {}
