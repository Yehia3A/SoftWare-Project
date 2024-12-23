import { Controller, Post, Body } from '@nestjs/common';
import { RecommendationService } from './recommendations.service';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Post('')
  async recommend(@Body() userData: { userId: string }) {
    return this.recommendationService.getRecommendations(userData.userId);
  }
}
