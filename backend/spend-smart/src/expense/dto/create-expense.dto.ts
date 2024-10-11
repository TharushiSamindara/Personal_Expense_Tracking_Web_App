/*import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ExpenseDto {
    @IsString()
    name: string;

    @IsNumber()
    amount: number;
}

export class CreateExpenseDto {
    @IsString()
    readonly username: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ExpenseDto)
    readonly expenses: ExpenseDto[];
}

export class AddExpenseDto {
    @IsString()
    readonly username: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ExpenseDto)
    readonly newExpenses: ExpenseDto[];
}

export class UpdateExpenseDto {
    @IsString()
    readonly name?: string;

    @IsNumber()
    readonly amount?: number;
}*/

/*import { IsArray, IsDateString, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';*/

/*export class ExpenseDto {
    @IsString()
    name: string;

    @IsNumber()
    amount: number;

    @IsDateString()
    date: string;  // Added to capture the date of the expense
}*/

/*export class AddExpenseDto {
    @IsString()
    username: string;

    @IsArray()
    newExpenses: ExpenseDto[];
}

export class ExpenseDto {
    @IsString()
    name: string;

    @IsNumber()
    amount: number;

    @IsString()
    date: string; // Ensure the format matches your front-end
}*/

/*export class CreateExpenseDto {
    @IsString()
    readonly username: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ExpenseDto)
    readonly expenses: ExpenseDto[];
}*/
/*export class CreateExpenseDto {
    @IsString()
    username: string;
  
    @IsString()
    name: string;
  
    @IsNumber()
    amount: number;
  
    @IsDateString()
    date: string;
  }

/*export class AddExpenseDto {
    @IsString()
    readonly username: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ExpenseDto)
    readonly newExpenses: ExpenseDto[];
}*/

/*export class UpdateExpenseDto {
    @IsString()
    readonly name?: string;

    @IsNumber()
    readonly amount?: number;

    @IsDateString()
    readonly date?: string;  // Added for updating the date if needed
}
*/
// src/expenses/dto/create-expense.dto.ts

// src/expenses/dto/create-expense.dto.ts

import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
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

  
