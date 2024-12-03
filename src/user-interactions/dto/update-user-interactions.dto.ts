import { IsNumber, IsDate, IsOptional } from 'class-validator';

export class UpdateUserInteractionDto {
    @IsNumber()
    @IsOptional()
    score?: number;

    @IsNumber()
    @IsOptional()
    time_spent_minutes?: number;

    @IsDate()
    @IsOptional()
    last_accessed?: Date;
}