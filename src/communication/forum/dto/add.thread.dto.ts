import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class AddThreadDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsMongoId() // Validate that the creator is a valid MongoDB ObjectId
  @IsNotEmpty()
  creator: string;
}
