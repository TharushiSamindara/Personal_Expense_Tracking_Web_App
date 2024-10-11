import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateExpenseDto, RemoveExpenseDto, SetMaxMonthlyExpenseDto, UpdateExpenseDto, GetMonthlyExpensesDto } from './dto/create-expense.dto';
import { ExpenseService } from './expense.service';
import { Expense } from './schema/expense.schema';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post('create')
  async createExpense(@Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return this.expenseService.addExpense(createExpenseDto.username, createExpenseDto.expense);
  }

  @Get('getAll/:username')
  async getAllExpense(@Param('username') username: string): Promise<Expense[]> {
    return this.expenseService.findAll(username);
  }

  @Get('user-expenses')
  async getUserExpenses(@Query('username') username: string): Promise<Expense[]> {
    return this.expenseService.findUserExpensesForCurrentMonth(username);
  }

  @Get('monthly-expenses')
  async getDailyExpenses(@Query('username') username: string) {
    return this.expenseService.getTotalExpensesPerDay(username);
  }

  @Get('total-expenses/:username')
  async getTotalExpenses(@Param('username') username: string): Promise<{ total: number }> {
    const total = await this.expenseService.getTotalExpenses(username);
    return { total };
  }

  @Delete('remove')
  async removeExpense(@Body() removeExpenseDto: RemoveExpenseDto) {
    return await this.expenseService.removeExpense(removeExpenseDto);
  }

  @Patch('update')
  async updateExpense(@Body() updateExpenseDto: UpdateExpenseDto) {
    return await this.expenseService.updateExpense(updateExpenseDto);
  }

  @Post('set-max-monthly-expense')
  async setMaxMonthlyExpense(@Body() setMaxMonthlyExpenseDto: SetMaxMonthlyExpenseDto) {
    return await this.expenseService.setMaxMonthlyExpense(setMaxMonthlyExpenseDto);
  }

  @Get('get-max-monthly-expense')
  async getMaxMonthlyExpense(@Query('username') username: string) {
    return await this.expenseService.getMaxMonthlyExpense(username);
  }

  @Get('get-balance/:username')
  async getBalance(@Param('username') username: string) {
    return await this.expenseService.getBalance(username);
  }

  @Get('total-monthly')
  async getTotalMonthlyExpenses(@Query() query: GetMonthlyExpensesDto) {
    return await this.expenseService.getTotalMonthlyExpenses(query);
  }
}

    