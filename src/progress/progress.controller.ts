import { Controller, Post, Patch, Get, Param, Body, Delete } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/createProgress.dto';
import { UpdateProgressDto } from './dto/updateProgress.dto';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

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

  // Delete a progress record by MongoDB ObjectID
  @Delete(':id')
  async deleteProgress(@Param('id') id: string) {
    return this.progressService.deleteProgress(id);
  }
}