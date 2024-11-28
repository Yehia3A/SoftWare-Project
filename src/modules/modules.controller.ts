import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from 'src/modules/dto/create-module.dto';

@Controller('modules')
export class ModulesController {
    constructor(private readonly modulesService: ModulesService) { }

    @Post()
    createModule(@Body() createModuleDto: CreateModuleDto) {
        return this.modulesService.createModule(createModuleDto);
    }

    @Get(':courseId')
    getModulesByCourseId(@Param('courseId') courseId: string) {
        return this.modulesService.getModulesByCourseId(courseId);
    }
}
