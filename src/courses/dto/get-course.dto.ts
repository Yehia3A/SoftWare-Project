import { IsOptional , IsString , IsIn , IsNotEmpty, isString } from "class-validator";

export class CreateCourseDto{
    @IsOptional()
    @IsString()
    id? : string;

    @IsString()
    @IsNotEmpty()
    title : string;

    @IsString()
    @IsOptional()
    category? : string;

    @IsString()
    @IsOptional()
    @IsIn(['Beginner' , 'Intermediate' , 'Advanced'])
    difficulty? : 'Beginner' | 'Intermediate' | 'Advanced';
}