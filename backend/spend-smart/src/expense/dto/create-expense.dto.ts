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

import { IsArray, IsDateString, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ExpenseDto {
    @IsString()
    name: string;

    @IsNumber()
    amount: number;

    @IsDateString()
    date: string;  // Added to capture the date of the expense
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

    @IsDateString()
    readonly date?: string;  // Added for updating the date if needed
}



