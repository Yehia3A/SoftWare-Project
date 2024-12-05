import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizzesModule } from './quizzes/quizzes.module';
import { UserInteractionsModule } from './user-interactions/user-interactions.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { UsersModule } from './users/user.module';
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './modules/modules.module';
import { ProgressesModule } from './progress/progress.module';
import { ConfigModule } from '@nestjs/config';

import { ResponsesModule } from './response/response.module';

import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';


@Module({
  imports: [
    ConfigModule.forRoot(),  // Load environment variables from .env
    MongooseModule.forRoot("mongodb+srv://elearning:elearning123@cluster0.3ylmz.mongodb.net/E-learning"),  
    QuizzesModule,
    UserInteractionsModule,
    RecommendationsModule,
    UsersModule,
    CoursesModule,
    ModulesModule,
    ProgressesModule,
    ResponsesModule,
    AuthModule
  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
