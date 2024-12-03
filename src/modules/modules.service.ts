<<<<<<< HEAD
import { Injectable } from '@nestjs/common';

@Injectable()
export class ModulesService {}
=======
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
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<Module> {
    const createdModule = new this.moduleModel(createModuleDto);
    return createdModule.save();
  }

  async findOne(id: string): Promise<Module> {
    const module = await this.moduleModel.findById(id).populate('course_id');
    if (!module) throw new NotFoundException('Module not found');
    return module;
  }

  async update(id: string, updateModuleDto: UpdateModuleDto): Promise<Module> {
    const updatedModule = await this.moduleModel.findByIdAndUpdate(
      id,
      updateModuleDto,
      { new: true },
    );
    if (!updatedModule) throw new NotFoundException('Module not found');
    return updatedModule;
  }

  async remove(id: string): Promise<void> {
    const result = await this.moduleModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Module not found');
  }
}
>>>>>>> 2390a8ead770db3d57cf8bb675a3eb4376aec2c3
