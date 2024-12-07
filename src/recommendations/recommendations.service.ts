import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Recommendation } from './recommendations.schema';
import { CreateRecommendationDto } from './dto/create.recommendation';
import { UpdateRecommendationDto } from './dto/update.recommendation';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectModel(Recommendation.name) 
    private recommendationModel: Model<Recommendation>
  ) {}

  async create(createRecommendationDto: CreateRecommendationDto): Promise<Recommendation> {
    const createdRecommendation = new this.recommendationModel(createRecommendationDto);
    return createdRecommendation.save();
  }

  async findAll(): Promise<Recommendation[]> {
    return this.recommendationModel.find()
      .populate('userId')
      .populate('recommendedCourses')
      .populate('recommendedModules')
      .exec();
  }

  async findOne(id: string): Promise<Recommendation> {
    const recommendation = await this.recommendationModel.findById(id)
      .populate('userId')
      .populate('recommendedCourses')
      .populate('recommendedModules')
      .exec();
    
    if (!recommendation) {
      throw new NotFoundException(`Recommendation with ID ${id} not found`);
    }
    
    return recommendation;
  }

  async findByUser(userId: string): Promise<Recommendation[]> {
    return this.recommendationModel.find({ userId })
      .populate('userId')
      .populate('recommendedCourses')
      .populate('recommendedModules')
      .exec();
  }

  async update(
    id: string, 
    updateRecommendationDto: UpdateRecommendationDto
  ): Promise<Recommendation> {
    const recommendation = await this.recommendationModel
      .findByIdAndUpdate(id, updateRecommendationDto, { new: true })
      .exec();
    
    if (!recommendation) {
      throw new NotFoundException(`Recommendation with ID ${id} not found`);
    }
    
    return recommendation;
  }

  async remove(id: string): Promise<Recommendation> {
    const recommendation = await this.recommendationModel.findByIdAndDelete(id).exec();
    
    if (!recommendation) {
      throw new NotFoundException(`Recommendation with ID ${id} not found`);
    }
    
    return recommendation;
  }

  // Additional method to add recommended courses
  async addRecommendedCourses(
    id: string, 
    courseIds: Types.ObjectId[]
  ): Promise<Recommendation> {
    const recommendation = await this.recommendationModel
      .findByIdAndUpdate(
        id, 
        { $addToSet: { recommendedCourses: { $each: courseIds } } },
        { new: true }
      )
      .exec();
    
    if (!recommendation) {
      throw new NotFoundException(`Recommendation with ID ${id} not found`);
    }
    
    return recommendation;
  }

  // Additional method to add keywords
  async addKeywords(
    id: string, 
    keywords: string[]
  ): Promise<Recommendation> {
    const recommendation = await this.recommendationModel
      .findByIdAndUpdate(
        id, 
        { $addToSet: { keywords: { $each: keywords } } },
        { new: true }
      )
      .exec();
    
    if (!recommendation) {
      throw new NotFoundException(`Recommendation with ID ${id} not found`);
    }
    
    return recommendation;
  }
}