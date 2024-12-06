import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class AddPostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsMongoId() // Validate that the creator is a valid MongoDB ObjectId
  @IsNotEmpty()
  creator: string;
}
