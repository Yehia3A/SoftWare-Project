import { Controller, Post, Patch, Get, Param, Body, Delete, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProgressService } from './progress.service'; // Correct import
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  // Download analytics as CSV
  @Get('download-analytics')
  async downloadAnalytics(@Query('course_id') course_id: string, @Res() res: Response) {
    const analytics = await this.progressService.getInstructorAnalytics(course_id);
    const csv = this.convertToCSV(analytics);
    res.header('Content-Type', 'text/csv');
    res.attachment('analytics.csv');
    res.send(csv);
  }

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
  @Get('dashboard/student/performance-metrics')
  async getStudentDashboard(@Query('user_id') user_id: string) {
    return this.progressService.getStudentDashboardData(user_id);
  }

  // Aggregated analytics for instructors
  @Get('dashboard/instructor/analytics')
  async getInstructorAnalytics(@Query('course_id') course_id: string) {
    return this.progressService.getInstructorAnalytics(course_id);
  }

  // Get quiz results by quiz ID
  @Get('quiz-results/:quiz_id')
  async getQuizResults(@Param('quiz_id') quiz_id: string) {
    return this.progressService.getQuizResults(quiz_id);
  }

  // Delete a progress record by MongoDB ObjectID
  @Delete(':id')
  async deleteProgress(@Param('id') id: string) {
    return this.progressService.deleteProgress(id);
  }

  private convertToCSV(data: any): string {
    const headers = Object.keys(data).join(',');
    const values = Object.values(data).map(value => isNaN(Number(value)) ? 0 : Number(value)).join(',');
    return `${headers}\n${values}`;
  }
}