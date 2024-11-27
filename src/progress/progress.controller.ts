import { Controller, Post, Patch, Get, Param, Body } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/createProgress.dto';
import { UpdateProgressDto } from './dto/updateProgress.dto';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  async createProgress(@Body() createProgressDto: CreateProgressDto) {
    return this.progressService.createProgress(createProgressDto);
  }

  @Patch(':id')
  async updateProgress(@Param('id') id: string, @Body() updateProgressDto: UpdateProgressDto) {
    return this.progressService.updateProgress(id, updateProgressDto);
  }

  @Get()
  async getAllProgress() {
    return this.progressService.getAllProgress();
  }
}
