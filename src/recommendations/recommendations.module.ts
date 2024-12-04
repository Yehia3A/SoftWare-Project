import { Module } from '@nestjs/common';
import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecommendationSchema } from './recommendations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Recommendation', schema: RecommendationSchema }]),
  ],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
})
export class RecommendationsModule {}
