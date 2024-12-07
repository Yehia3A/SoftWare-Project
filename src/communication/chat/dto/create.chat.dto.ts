import { IsString, IsNotEmpty, IsEnum, IsOptional, IsArray, IsMongoId } from 'class-validator';

export class CreateChatDto {
  @IsMongoId()
  @IsNotEmpty()
  sender: string;

  @IsArray()
  @IsMongoId({ each: true })
  receiver: string[];

  @IsString()
  @IsEnum(['direct', 'group'])
  @IsOptional()
  chatType: 'direct' | 'group';

}
