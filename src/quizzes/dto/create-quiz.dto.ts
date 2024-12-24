import { IsNumber, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateQuizDto {
  @IsMongoId()
  @IsNotEmpty()
  moduleId: string;

  
  @IsNumber()
  @IsNotEmpty()
  numberOfQuestions: number;
}
