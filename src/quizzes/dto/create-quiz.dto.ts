import { IsNotEmpty, IsArray } from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty()
  moduleId: string;

  @IsArray()
  questions: Array<{
    text: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }>;
}
