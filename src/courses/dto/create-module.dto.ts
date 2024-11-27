import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateModuleDto {
    @IsNotEmpty()
    @IsString()
    courseId: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsArray()
    resources: string[];
}
