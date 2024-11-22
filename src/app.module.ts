import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://elearning:elearning123@cluster0.3ylmz.mongodb.net/'),
    QuizzesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}