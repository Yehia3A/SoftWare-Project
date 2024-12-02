import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress } from './progress.schema';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name) private readonly progressModel: Model<Progress>
  ) {}

  // Create a new progress record
  async createProgress(createProgressDto: CreateProgressDto): Promise<Progress> {
    const newProgress = new this.progressModel(createProgressDto);
    return newProgress.save();
  }

  // Update an existing progress record by MongoDB ObjectID
  async updateProgress(
    id: string,
    updateProgressDto: UpdateProgressDto
  ): Promise<Progress> {
    const updatedProgress = await this.progressModel
      .findByIdAndUpdate(id, updateProgressDto, { new: true })
      .exec();
    if (!updatedProgress) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }
    return updatedProgress;
  }

  // Get all progress records
  async getAllProgress(): Promise<Progress[]> {
    return this.progressModel.find().exec();
  }

  // Get a single progress record by MongoDB ObjectID
  async getProgressById(id: string): Promise<Progress> {
    const progress = await this.progressModel.findById(id).exec();
    if (!progress) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }
    return progress;
  }

  // Delete a progress record by MongoDB ObjectID
  async deleteProgress(id: string): Promise<Progress> {
    const deletedProgress = await this.progressModel.findByIdAndDelete(id).exec();
    if (!deletedProgress) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }
    return deletedProgress;
  }
}