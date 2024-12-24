import { IsString, IsArray, IsNotEmpty, IsIn, IsOptional, Validate } from 'class-validator';
import { IsCourseIdValidConstraint } from 'src/validators/is-course-id-valid.validator';
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
  title: string;
  
  @IsArray()
  @IsOptional()
  resources?: string[]; // New field for resources (optional)

  
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsOptional()
  questionBank?: CreateQuestionDto[];
}
