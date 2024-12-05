
import { Controller, Get, Post, Body, Param, Delete, Patch, Put } from '@nestjs/common';

import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

    @Post()
    async createModule(@Body() createModuleDto: CreateModuleDto) {
        return await this.modulesService.createModule(createModuleDto);
    }

    @Get(':course_id')
    async getModulesByCourseId(@Param('course_id') course_id: string) {
        return await this.modulesService.getModulesByCourseId(course_id);
    }

    @Put(':id')
    async updateModule(
        @Param('id') id: string,
        @Body() updateModuleDto: UpdateModuleDto,
    ) {
        return await this.modulesService.updateModule(id, updateModuleDto);
    }

    @Delete(':id')
    async deleteModule(@Param('id') id: string) {
        return await this.modulesService.deleteModule(id);
    }
}
