import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';

import { Quiz, QuizSchema } from './quizzes.schema'; // Make sure this path is correct
import { Response, ResponseSchema } from '../response/response.schema'; // Import ResponseModel from the correct path

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: Response.name, schema: ResponseSchema }, // Add ResponseModel here
    ]),
  ],
  providers: [QuizzesService],
  controllers: [QuizzesController],
   exports: [QuizzesService]
})
export class QuizzesModule {}
