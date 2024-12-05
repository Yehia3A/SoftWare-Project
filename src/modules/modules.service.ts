import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Modules, ModulesDocument} from './modules.schema'
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Modules.name) private ModulesModel: Model<ModulesDocument>,
  ) {}

  async createModule(createModulesDto: CreateModuleDto): Promise<Modules> {
    const createdModules = new this.ModulesModel(createModulesDto);
    return createdModules.save();
  }


    async getModuleByCourseId(course_id: string): Promise<Modules[]> {
        const Moduless = await this.ModulesModel.find({ course_id }).exec();
        if (!Moduless.length) {
            throw new NotFoundException(
                `No Moduless found for the course ID: ${course_id}`,
            );
        }
        return Moduless;
    }

    async updateModule(id: string, updateModulesDto: UpdateModuleDto): Promise<Modules> {
        const updatedModules = await this.ModulesModel
            .findByIdAndUpdate(id, updateModulesDto, { new: true })
            .exec();
        if (!updatedModules) {
            throw new NotFoundException(`Modules with ID: ${id} not found`);
        }
        return updatedModules;
    }

    async deleteModule(id: string): Promise<{ message: string }> {
        const result = await this.ModulesModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Modules with ID: ${id} not found`);
        }
        return { message: `Modules with ID: ${id} successfully deleted` };
    }



}
