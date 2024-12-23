import { Module } from '@nestjs/common';
import { RecommendationController } from './recommendations.controller';
import { RecommendationService } from './recommendations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Recommendation, RecommendationSchema } from './recommendations.schema';
import { HttpModule } from '@nestjs/axios';

import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recommendation.name, schema: RecommendationSchema },
    ]),
    UsersModule,
    HttpModule,
  ],
  controllers: [RecommendationController],
  providers: [RecommendationService],
  exports: [RecommendationService],
})
export class RecommendationsModule {}
