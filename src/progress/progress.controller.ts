import { Controller, Post, Patch, Get, Param, Body, Delete, Query } from '@nestjs/common';
import { progressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Controller('progress')
export class progressController {
  constructor(private readonly progressService: progressService) {}

  // Create a new progress record
  @Post()
  async createProgress(@Body() createProgressDto: CreateProgressDto) {
    return this.progressService.createProgress(createProgressDto);
  }

  // Update an existing progress record by MongoDB ObjectID
  @Patch(':id')
  async updateProgress(
    @Param('id') id: string,
    @Body() updateProgressDto: UpdateProgressDto
  ) {
    return this.progressService.updateProgress(id, updateProgressDto);
  }

  // Get all progress records
  @Get()
  async getAllProgress() {
    return this.progressService.getAllProgress();
  }

  // Get a single progress record by MongoDB ObjectID
  @Get(':id')
  async getProgressById(@Param('id') id: string) {
    return this.progressService.getProgressById(id);
  }

  // Aggregated analytics for students
  @Get('dashboard/student')
  async getStudentDashboard(@Query('user_id') user_id: string) {
    return this.progressService.getStudentDashboardData(user_id);
  }

  // Aggregated analytics for instructors
  @Get('analytics/instructor')
  async getInstructorAnalytics(@Query('course_id') course_id: string) {
    return this.progressService.getInstructorAnalytics(course_id);
  }

  // Delete a progress record by MongoDB ObjectID
  @Delete(':id')
  async deleteProgress(@Param('id') id: string) {
    return this.progressService.deleteProgress(id);
  }
}