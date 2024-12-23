import { IsString, IsArray } from 'class-validator';

export class SubmitAnswerDto {
  @IsString()
  quiz_id: string;

  @IsArray()
  answers: { question_id: string; answer: string }[];
}
