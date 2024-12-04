import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quizzes, QuizzesSchema } from './quizzes.schema';

@Module({
  imports:[
  MongooseModule.forFeature([{ name: Quizzes.name, schema: QuizzesSchema }]),
  ],
  providers: [QuizzesService],
  controllers: [QuizzesController],
  exports: [QuizzesService],
})
export class QuizzesModule {}
