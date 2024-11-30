import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateModuleDto {
    @IsNotEmpty()
    @IsString()
    course_id: string; // Updated to match the schema field name

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true }) // Validate each array element
    resources: string[];
}
