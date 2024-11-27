import { IsNotEmpty, IsString, IsIn, IsOptional } from 'class-validator';

export class CreateCourseDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional() // Optional field
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsIn(['Beginner', 'Intermediate', 'Advanced'])
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';

    @IsNotEmpty()
    @IsString()
    createdBy: string;
}
