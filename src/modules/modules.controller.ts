import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly moduleService: ModulesService) {}

  @Post()
  create(@Body() createModuleDto: CreateModuleDto) {
    return  this.moduleService.create(createModuleDto);
  }

  @Get()
  findAll() {
    return this.moduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.moduleService.update(id, updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleService.remove(id);
  }
}
