import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { Quiz, QuizSchema } from './quizzes.schema';
import { Response, ResponseSchema } from '../response/response.schema';
import { ModulesModule } from '../modules/modules.module'; // Import ModulesModule

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: Response.name, schema: ResponseSchema },
    ]),
    ModulesModule, // Add ModulesModule to the imports array
  ],
  providers: [QuizzesService],
  controllers: [QuizzesController],
  exports: [QuizzesService],
})
export class QuizzesModule {}