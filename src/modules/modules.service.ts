import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Modules } from './modules.schema';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Modules.name) private readonly moduleModel: Model<Modules>,
  ) {}

  // Create a new module for a specific course
  async createModule(
    createModuleDto: CreateModuleDto,
    courseId: string,
  ): Promise<Modules> {
    const newModule = new this.moduleModel({
      ...createModuleDto,
      course_id: courseId,
    });
    return await newModule.save();
  }

  // Find all modules for a specific course
  async findAllByCourseId(courseId: string): Promise<Modules[]> {
    const modules = await this.moduleModel.find({ course_id: courseId }).exec();
    if (!modules || modules.length === 0) {
      throw new NotFoundException(`No modules found for course ID: ${courseId}`);
    }
    return modules;
  }

  // Find a single module by its ID
  async findOne(id: string): Promise<Modules> {
    const module = await this.moduleModel.findById(id).exec();
    if (!module) {
      throw new NotFoundException(`Module with ID: ${id} not found`);
    }
    return module;
  }

  // Update a module by its ID
  async update(id: string, updateModuleDto: UpdateModuleDto): Promise<Modules> {
    const updatedModule = await this.moduleModel
      .findByIdAndUpdate(id, updateModuleDto, { new: true })
      .exec();
    if (!updatedModule) {
      throw new NotFoundException(`Module with ID: ${id} not found`);
    }
    return updatedModule;
  }

  // Remove a module by its ID
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.moduleModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Module with ID: ${id} not found`);
    }
    return { message: `Module with ID: ${id} successfully deleted` };
  }
}
