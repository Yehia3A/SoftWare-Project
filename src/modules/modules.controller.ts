import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Controller('courses/:courseId/modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  // Create a new module for the specified course
  @Post()
  async createModule(
    @Param('courseId') courseId: string,
    @Body() createModuleDto: CreateModuleDto,
  ) {
    return await this.modulesService.createModule(createModuleDto, courseId);
  }

  // Get all modules for the specified course
  @Get()
  async findAll(@Param('courseId') courseId: string) {
    return await this.modulesService.findAllByCourseId(courseId);
  }

  // Get a single module by its ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.modulesService.findOne(id);
  }

  // Update a module by its ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateModuleDto: UpdateModuleDto,
  ) {
    return await this.modulesService.update(id, updateModuleDto);
  }

  // Delete a module by its ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.modulesService.remove(id);
  }
}
