import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizzesModule } from './quizzes/quizzes.module';
import { UserInteractionsModule } from './user-interactions/user-interactions.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { UsersModule } from './users/user.module';
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './modules/modules.module';
import { progressesModule } from './progress/progress.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://elearning:elearning123@cluster0.3ylmz.mongodb.net/E-learning'),
    QuizzesModule,
    UserInteractionsModule,
    RecommendationsModule,
    UsersModule,
    CoursesModule,
    ModulesModule,
    progressesModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
