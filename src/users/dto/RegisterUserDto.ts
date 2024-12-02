import { IsEmail, IsString, MinLength, IsOptional, IsUrl } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  role: string;

  @IsOptional()
  @IsUrl()
  profilePictureUrl?: string;
}
