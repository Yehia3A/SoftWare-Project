import { IsString, IsNotEmpty, IsArray, IsMongoId } from 'class-validator';

export class CreateForumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsMongoId({ each: true }) // Ensure each element in the array is a valid MongoDB ObjectId
  participants: string[];

  @IsArray()
  @IsMongoId({ each: true })
  moderators: string[];
}