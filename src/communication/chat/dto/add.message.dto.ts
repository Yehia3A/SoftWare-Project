import { IsString, IsNotEmpty, IsMongoId, IsArray, IsOptional } from 'class-validator';

export class AddMessageDto {
  @IsMongoId()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsArray()
  @IsOptional()
  attachments: string[];
}
