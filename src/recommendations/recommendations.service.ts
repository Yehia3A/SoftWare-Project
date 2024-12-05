import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Recommendation } from './recommendations.schema';
import { User } from '../users/user.schema';
import { Course } from '../courses/courses.schema';
import { Modules } from '../modules/modules.schema';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectModel(Recommendation.name)
    private readonly recommendationModel: Model<Recommendation>,
  ) {}

  // Create or update a recommendation for a user
  async upsertRecommendation(
    userId: Types.ObjectId,
    recommendedCourses: Types.ObjectId[],
    recommendedModules: Types.ObjectId[] = [],
    keywords: string[] = [],
  ): Promise<Recommendation> {
    return this.recommendationModel.findOneAndUpdate(
      { userId },
      { recommendedCourses, recommendedModules, keywords },
      { new: true, upsert: true },
    );
  }

  // Get recommendations by user ID
  async getRecommendationsByUser(userId: Types.ObjectId): Promise<Recommendation | null> {
    return this.recommendationModel
      .findOne({ userId })
      .populate('recommendedCourses')
      .populate('recommendedModules')
      .exec();
  }

  // Add courses to a user's recommendations
  async addCoursesToRecommendation(
    userId: Types.ObjectId,
    courseIds: Types.ObjectId[],
  ): Promise<Recommendation> {
    return this.recommendationModel.findOneAndUpdate(
      { userId },
      { $addToSet: { recommendedCourses: { $each: courseIds } } },
      { new: true },
    );
  }

  // Add modules to a user's recommendations
  async addModulesToRecommendation(
    userId: Types.ObjectId,
    moduleIds: Types.ObjectId[],
  ): Promise<Recommendation> {
    return this.recommendationModel.findOneAndUpdate(
      { userId },
      { $addToSet: { recommendedModules: { $each: moduleIds } } },
      { new: true },
    );
  }

  // Remove a course from recommendations
  async removeCourseFromRecommendation(
    userId: Types.ObjectId,
    courseId: Types.ObjectId,
  ): Promise<Recommendation> {
    return this.recommendationModel.findOneAndUpdate(
      { userId },
      { $pull: { recommendedCourses: courseId } },
      { new: true },
    );
  }

  // Remove a module from recommendations
  async removeModuleFromRecommendation(
    userId: Types.ObjectId,
    moduleId: Types.ObjectId,
  ): Promise<Recommendation> {
    return this.recommendationModel.findOneAndUpdate(
      { userId },
      { $pull: { recommendedModules: moduleId } },
      { new: true },
    );
  }

  // Get all recommendations (for admin or debugging purposes)
  async getAllRecommendations(): Promise<Recommendation[]> {
    return this.recommendationModel.find().exec();
  }
}