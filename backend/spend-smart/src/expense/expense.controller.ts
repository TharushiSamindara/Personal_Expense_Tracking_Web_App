import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Expense } from './schema/expense.schema';
import { AddExpenseDto, CreateExpenseDto, UpdateExpenseDto } from './dto/create-expense.dto';

@Controller('expense')
export class ExpenseController {
    constructor(
        private expenseService : ExpenseService
    ){}

    @Post('create')
    async createExpense(
        @Body()
        expense: CreateExpenseDto
    ): Promise<Expense> {
        try {
            return await this.expenseService.create(expense);
        } catch (error) {
            console.error('Error in createExpense:', error);
            throw new InternalServerErrorException('Failed to create expense');
        }
    }

    @Post('add')
    @UsePipes(new ValidationPipe({ transform: true }))
    async addExpense(
        @Body() addExpenseDto: AddExpenseDto
    ): Promise<Expense> {
        return this.expenseService.addExpenses(addExpenseDto.username, addExpenseDto.newExpenses);
    }

    @Get('getAllAppUsersDetails')
    async getAllExpense(

    ): Promise<{ username: string; expenses: { name: string; amount: number }[] }[]> {
        return this.expenseService.findAll();
    }

    @Get('getUserExpense')
    async getAllUserExpense(
        @Query('username') username: string
    ): Promise<{ username: string; expenses: { name: string; amount: number }[] }> {
        return this.expenseService.findByUsername(username);
    }
/****************************/
    @Get('getUserExpenseAmount/:username/:expenseName')
    async getAllUserExpenseAmount(
        @Param('username') username: string,
        @Param('expenseName') expenseName: string,
    ): Promise<Number> {
        return this.expenseService.findByUsernameAndExpenseName(username,expenseName);
    }

    @Patch('update/:username/:expenseName')
    async updateExpense(
        @Param('username') username: string,
        @Param('expenseName') expenseName: string,
        @Body() updateExpenseDto: UpdateExpenseDto
    ) {
        return this.expenseService.updateExpense(username, expenseName, updateExpenseDto);
    }

    @Delete('remove/:username/:expenseName')
    async removeExpense(
        @Param('username') username: string,
        @Param('expenseName') expenseName: string
    ){
        return this.expenseService.removeExpense(username, expenseName);
    }

}
