import { IsNumber, Min, Max, IsOptional } from 'class-validator';

export class CreateProgressDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  completion_percentage: number;

  @IsOptional()
  created_at?: Date;
}
