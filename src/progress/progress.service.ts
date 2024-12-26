import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress, ProgressDocument } from './progress.schema';
import { Rating, RatingDocument } from '../rating/rating.schema'; // Import Rating model
import { QuizResult, QuizResultDocument } from '../quiz-results/quiz-results.schema'; // Import QuizResult model
import { CreateProgressDto } from './dto/create-progress.dto'; // Import CreateProgressDto
import { UpdateProgressDto } from './dto/update-progress.dto'; // Import UpdateProgressDto

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name) private readonly progressModel: Model<ProgressDocument>,
    @InjectModel(Rating.name) private readonly ratingModel: Model<RatingDocument>,
    @InjectModel(QuizResult.name) private readonly quizResultModel: Model<QuizResultDocument>,
  ) {}

  // Create a new progress record
  async createProgress(createProgressDto: CreateProgressDto): Promise<Progress> {
    const createdProgress = new this.progressModel(createProgressDto);
    return createdProgress.save();
  }

  // Update an existing progress record by MongoDB ObjectID
  async updateProgress(
    id: string,
    updateProgressDto: UpdateProgressDto
  ): Promise<Progress> {
    const existingProgress = await this.progressModel
      .findByIdAndUpdate(id, updateProgressDto, { new: true })
      .exec();
    if (!existingProgress) {
      throw new NotFoundException(`Progress #${id} not found`);
    }
    return existingProgress;
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

  // Aggregated analytics for students
  async getStudentDashboardData(user_id: string): Promise<any> {
    const progressData = await this.progressModel.find({ user_id }).exec();
    const totalCourses = progressData.length;
    const avgCompletionRate = progressData.reduce((sum, p) => sum + p.completion_percentage, 0) / totalCourses;
    const avgScore = progressData.reduce((sum, p) => sum + p.average_score, 0) / totalCourses;

    return {
      totalCourses,
      avgCompletionRate: avgCompletionRate.toFixed(2),
      avgScore: avgScore.toFixed(2),
      engagementTrends: progressData.map((p) => ({ course_id: p.course_id, progress: p.completion_percentage })),
    };
  }

  // Aggregated analytics for instructors
  async getInstructorAnalytics(course_id: string): Promise<any> {
    const progressData = await this.progressModel.find({ course_id }).exec();
    const totalStudents = progressData.length;
    const avgCompletionRate = progressData.reduce((sum, p) => sum + p.completion_percentage, 0) / totalStudents;
    const avgScore = progressData.reduce((sum, p) => sum + p.average_score, 0) / totalStudents;

    const ratings = await this.ratingModel.find({ course_id }).exec();
    const avgCourseRating = ratings.filter(r => r.type === 'course').reduce((sum, r) => sum + r.rating, 0) / ratings.length;
    const avgInstructorRating = ratings.filter(r => r.type === 'instructor').reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    return {
      totalStudents,
      avgCompletionRate: avgCompletionRate.toFixed(2),
      avgScore: avgScore.toFixed(2),
      engagementTrends: progressData.map((p) => ({ user_id: p.user_id, progress: p.completion_percentage })),
      avgCourseRating: avgCourseRating.toFixed(2),
      avgInstructorRating: avgInstructorRating.toFixed(2),
    };
  }

  async getQuizResults(quiz_id: string): Promise<any> {
    const quizResults = await this.quizResultModel.find({ quiz_id }).exec();
    return quizResults;
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