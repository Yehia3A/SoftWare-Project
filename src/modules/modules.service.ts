import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module, ModuleDocument } from './modules.schema';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModulesService {
    constructor(
        @InjectModel(Module.name) private moduleModel: Model<ModuleDocument>,
    ) { }

    async createModule(createModuleDto: CreateModuleDto): Promise<Module> {
        const newModule = new this.moduleModel(createModuleDto);
        return newModule.save();
    }

    async getModulesByCourseId(course_id: string): Promise<Module[]> {
        const modules = await this.moduleModel.find({ course_id }).exec();
        if (!modules.length) {
            throw new NotFoundException(
                `No modules found for the course ID: ${course_id}`,
            );
        }
        return modules;
    }

    async updateModule(id: string, updateModuleDto: UpdateModuleDto): Promise<Module> {
        const updatedModule = await this.moduleModel
            .findByIdAndUpdate(id, updateModuleDto, { new: true })
            .exec();
        if (!updatedModule) {
            throw new NotFoundException(`Module with ID: ${id} not found`);
        }
        return updatedModule;
    }

    async deleteModule(id: string): Promise<{ message: string }> {
        const result = await this.moduleModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Module with ID: ${id} not found`);
        }
        return { message: `Module with ID: ${id} successfully deleted` };
    }
}
