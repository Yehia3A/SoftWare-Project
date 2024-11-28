import { IsNotEmpty , IsString } from "class-validator";

export class DeleteCourseDto{
    @IsNotEmpty()
    @IsString()
    id : string
}