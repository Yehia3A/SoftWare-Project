import { IsNotEmpty, IsArray, IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRecommendationDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  recommendedCourses: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  recommendedModules?: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  keywords?: string[];
}