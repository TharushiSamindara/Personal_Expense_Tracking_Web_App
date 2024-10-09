import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseService } from './expense.service';
import { Expense } from './expense.module'; // Replace with your actual Expense model path

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post('create')
  async createExpense(
    @Body() createExpenseDto: CreateExpenseDto
  ): Promise<Expense> {
    const { username, expense } = createExpenseDto;
    return this.expenseService.addExpense(username, expense);
  }




  @Get('user-expenses')
  async getUserExpenses(
    @Query('username') username: string
  ): Promise<Expense[]> {
    return this.expenseService.findUserExpensesForCurrentMonth(username);
  }

}
    