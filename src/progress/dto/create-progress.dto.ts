import { IsNotEmpty, IsNumber, IsString, Min, Max, IsOptional } from 'class-validator';

export class CreateProgressDto {
  @IsNotEmpty()
  @IsString()
  course_id: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  completion_percentage: number;

  @IsNotEmpty()
  @IsNumber()
  average_score: number;

  @IsOptional()
  created_at?: Date;
}
