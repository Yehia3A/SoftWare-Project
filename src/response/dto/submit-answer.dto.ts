import { IsNotEmpty, IsArray } from 'class-validator';

export class SubmitAnswerDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  quizId: string;

  @IsArray()
  answers: Array<{
    questionId: string;
    answer: string;
  }>;
}
