import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Modules, ModuleDocument } from './modules.schema';
import { Progress, ProgressDocument } from '../progress/progress.schema'; // Import Progress model
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Modules.name) private readonly moduleModel: Model<ModuleDocument>,
    @InjectModel(Progress.name) private readonly progressModel: Model<ProgressDocument>, // Inject Progress model
  ) {}

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

  async getModulesForStudent(user_id: string): Promise<Modules[]> {
    const progress = await this.progressModel.findOne({ user_id }).exec();
    if (!progress) {
      return [];
    }
    const difficulty = this.getDifficultyFromScore(progress.average_score);
    return this.moduleModel.find({ difficulty }).exec();
  }

  private getDifficultyFromScore(score: number): 'Beginner' | 'Intermediate' | 'Advanced' {
    if (score < 50) return 'Beginner';
    if (score < 75) return 'Intermediate';
    return 'Advanced';
  }
}
