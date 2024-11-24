import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Get()
  findAll() {
    return this.modulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulesService.findOne(id);
  }

  @Post()
  create(@Body() createModuleDto: any) {
    return this.modulesService.create(createModuleDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateModuleDto: any) {
    return this.modulesService.update(id, updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modulesService.remove(id);
  }
}