import { IsNumber, IsDate, IsNotEmpty } from 'class-validator';

export class CreateUserInteractionDto {
    @IsNumber()
    @IsNotEmpty()
    score: number;

    @IsNumber()
    @IsNotEmpty()
    time_spent_minutes: number;

    @IsDate()
    @IsNotEmpty()
    last_accessed: Date;
}
