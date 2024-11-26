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
import { AuthModule } from './auth/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),  // Load environment variables from .env
    MongooseModule.forRoot(process.env.MONGODB_URI),  // Use the MONGODB_URI from environment variables
    QuizzesModule,
    UserInteractionsModule,
    RecommendationsModule,
    UsersModule,
    CoursesModule,
    ModulesModule,
    progressesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 