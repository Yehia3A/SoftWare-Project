import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class AddReplyDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsMongoId() // Validate that the creator is a valid MongoDB ObjectId
  @IsNotEmpty()
  creator: string;
}
