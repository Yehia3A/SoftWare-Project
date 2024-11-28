import { PartialType } from "@nestjs/mapped-types";
import { CreateModuleDto } from "../../modules/dto/create-module.dto";

export class UpdateCourseDto extends PartialType(CreateModuleDto){}