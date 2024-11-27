import { IsNumber, Min, Max } from 'class-validator';

export class CreateProgressDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  completion_percentage: number;
}