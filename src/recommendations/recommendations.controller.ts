import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards 
} from '@nestjs/common';
import { RecommendationService } from './recommendations.service';
import { CreateRecommendationDto } from './dto/create.recommendation';
import { UpdateRecommendationDto } from './dto/update.recommendation';
import { Types } from 'mongoose';

@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Post()
  create(@Body() createRecommendationDto: CreateRecommendationDto) {
    return this.recommendationService.create(createRecommendationDto);
  }

  @Get()
  findAll() {
    return this.recommendationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recommendationService.findOne(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.recommendationService.findByUser(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateRecommendationDto: UpdateRecommendationDto
  ) {
    return this.recommendationService.update(id, updateRecommendationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recommendationService.remove(id);
  }

  @Post(':id/courses')
  addRecommendedCourses(
    @Param('id') id: string, 
    @Body('courseIds') courseIds: string[]
  ) {
    // Convert string IDs to MongoDB ObjectIds
    const objectIds = courseIds.map(courseId => new Types.ObjectId(courseId));
    return this.recommendationService.addRecommendedCourses(id, objectIds);
  }

  @Post(':id/keywords')
  addKeywords(
    @Param('id') id: string, 
    @Body('keywords') keywords: string[]
  ) {
    return this.recommendationService.addKeywords(id, keywords);
  }
}