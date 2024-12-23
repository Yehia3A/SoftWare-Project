import { IsString, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class QuestionDto {
  @IsString()
  @IsNotEmpty()
  question_id: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  options: string[];

  @IsString()
  @IsNotEmpty()
  correctAnswer: string;

  @IsString()
  @IsNotEmpty()
  explanation: string;

}

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  module_id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  difficulty: 'Easy' | 'Medium' | 'Hard';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}
