import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NewExpenseDto } from './new-expense.dto';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @ValidateNested() // Ensures that `expense` is validated as a nested object.
  @Type(() => NewExpenseDto) // Converts the incoming object to an instance of `NewExpenseDto`.
  expense: NewExpenseDto; // Single expense input each time.
}

export class AddMonthlyExpenseDto {
    @IsNotEmpty()
    @IsString()
    username: string;
  
    @ValidateNested()
    @Type(() => NewExpenseDto)
    expense: NewExpenseDto;
  }


  export class SetMaxExpenseDto {
    @IsNotEmpty()
    @IsString()
    username: string;
  
    @IsNumber()
    maxMonthlyExpense: number;
  }

  export class RemoveExpenseDto {
    @IsNotEmpty()
    @IsString()
    username: string;
  
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsNumber()
    amount: number;
  
    @IsOptional()
    @IsString()
    date?: string;
  }

  export class UpdateExpenseDto {
    @IsNotEmpty()
    @IsString()
    username: string;
  
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsNumber()
    amount: number;
  
    @IsOptional()
    @IsString()
    date?: string; // Mark date as optional
  }

  export class GetMonthlyExpensesDto {
    @IsNotEmpty()
    @IsString()
    username: string;
  }


  export class SetMaxMonthlyExpenseDto {
    @IsString()
    username: string;

    @IsNumber()
    maxMonthlyExpense: number;
}