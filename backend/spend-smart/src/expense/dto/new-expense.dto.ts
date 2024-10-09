import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class NewExpenseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsDateString() // Ensures the date is in a valid date string format.
  date: string;
}
