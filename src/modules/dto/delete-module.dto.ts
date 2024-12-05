import { IsNotEmpty , IsString } from "class-validator";

export class DeleteModuleDto{
    @IsNotEmpty()
    @IsString()
    id : string
}