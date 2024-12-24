import { IsString, IsArray, IsNotEmpty, IsIn, IsOptional } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  
  @IsString()
  @IsNotEmpty()
  @IsIn(['Easy', 'Medium', 'Hard'])
  difficulty: string;

  @IsArray()
  @IsOptional()
  options?: string[];

  @IsString()
  @IsNotEmpty()
  correctAnswer: string;

  @IsString()
  @IsOptional()
  explanation?: string;
}

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  course_id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsOptional()
  questionBank?: CreateQuestionDto[];
}
