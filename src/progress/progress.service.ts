import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProgressDto } from './dto/createProgress.dto';
import { UpdateProgressDto } from './dto/updateProgress.dto';
import { Progress } from './progress.schema';

@Injectable()
export class ProgressService {
  constructor(@InjectModel(Progress.name) private progressModel: Model<Progress>) {}

  async createProgress(createProgressDto: CreateProgressDto): Promise<Progress> {
    const progress = new this.progressModel(createProgressDto);
    return progress.save();
  }

  async updateProgress(id: string, updateProgressDto: UpdateProgressDto): Promise<Progress | null> {
    return this.progressModel.findByIdAndUpdate(id, updateProgressDto, { new: true }).exec();
  }

  async getAllProgress(): Promise<Progress[]> {
    return this.progressModel.find().exec();
  }
}
