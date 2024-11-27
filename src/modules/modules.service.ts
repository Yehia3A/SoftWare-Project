import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module, ModuleDocument } from './modules.schema';
import { CreateModuleDto } from 'src/courses/dto/create-module.dto';

@Injectable()
export class ModulesService {
    constructor(
        @InjectModel(Module.name) private moduleModel: Model<ModuleDocument>,
    ) { }

    async createModule(createModuleDto: CreateModuleDto): Promise<Module> {
        const newModule = new this.moduleModel(createModuleDto);
        return newModule.save();
    }

    async getModulesByCourseId(courseId: string): Promise<Module[]> {
        return this.moduleModel.find({ courseId }).exec();
    }
}
