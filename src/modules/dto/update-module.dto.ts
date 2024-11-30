import { PartialType } from "@nestjs/mapped-types";
import { CreateModuleDto } from "../../modules/dto/create-module.dto";
import { IsNotEmpty } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateModuleDto){
    @IsNotEmpty()
    updatedAt : Date;
}