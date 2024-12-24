import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Modules, ModuleDocument } from './modules.schema';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModulesService {
  constructor(@InjectModel(Modules.name) private moduleModel: Model<ModuleDocument>) {}

  async create(createModuleDto: CreateModuleDto): Promise<Modules> {
    const createdModule = new this.moduleModel(createModuleDto);
    return createdModule.save();
  }

  async findAll(): Promise<Modules[]> {
    return this.moduleModel.find().exec();
  }

  async findOne(id: string): Promise<Modules> {
    const module = await this.moduleModel.findById(id).exec();
    if (!module) {
      throw new NotFoundException(`Module with ID "${id}" not found`);
    }
    return module;
  }

  async update(id: string, updateModuleDto: UpdateModuleDto): Promise<Modules> {
    const updatedModule = await this.moduleModel.findByIdAndUpdate(id, updateModuleDto, { new: true }).exec();
    if (!updatedModule) {
      throw new NotFoundException(`Module with ID "${id}" not found`);
    }
    return updatedModule;
  }

  async remove(id: string): Promise<void> {
    const result = await this.moduleModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Module with ID "${id}" not found`);
    }
  }
}
