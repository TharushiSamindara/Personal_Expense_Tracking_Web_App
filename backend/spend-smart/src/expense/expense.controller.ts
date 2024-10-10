import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateExpenseDto, SetMaxExpenseDto } from './dto/create-expense.dto';
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
    const dateWiseExpenses = this.expenseService.addExpenseDayWise(username, expense);
    return this.expenseService.addExpense(username, expense);
  }

  @Post('set-max-expense')
  async setMaxExpense(@Body() setMaxExpenseDto: SetMaxExpenseDto): Promise<Expense> {
    return this.expenseService.setMaxMonthlyExpense(setMaxExpenseDto);
  }




  @Get('user-expenses')
  async getUserExpenses(
    @Query('username') username: string
  ): Promise<Expense[]> {
    return this.expenseService.findUserExpensesForCurrentMonth(username);
  }

  /*@Get('monthly-expenses')
  async getMonthlyExpenses(@Query('username') username: string) {
    return this.expenseService.getTotalExpensesPerDay(username);
  }*/

  @Get('monthly-expenses')
  async getDailyExpenses(@Query('username') username: string) {
    const expenses = await this.expenseService.getTotalExpensesPerDay(username);
    return expenses; // Returns the daily expenses for each day in the current month
  }

  /*@Get('daily-totals')
  async getDailyTotals(@Query('username') username: string): Promise<any> {
    const userExpenses = await this.expenseService.getDailyTotals(username);
    return userExpenses; // Returns the daily totals as an array of objects
  }*/


  
  

}
    