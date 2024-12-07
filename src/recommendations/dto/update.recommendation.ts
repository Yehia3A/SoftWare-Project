import { IsOptional, IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateRecommendationDto {
  @IsOptional()
  @IsMongoId()
  userId?: Types.ObjectId;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  recommendedCourses?: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  recommendedModules?: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  keywords?: string[];
}