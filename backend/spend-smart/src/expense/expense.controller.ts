import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateExpenseDto, GetMonthlyExpensesDto, RemoveExpenseDto, SetMaxExpenseDto, UpdateExpenseDto } from './dto/create-expense.dto';
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
      //const dateWiseExpenses = this.expenseService.addExpenseDayWise(username, expense);//Day total
      const monthWiseExpenses = await this.expenseService.addExpenseMonthly(username, expense);//Monthly total expense
      return this.expenseService.addExpense(username, expense);
    }

    //set max expense
    @Post('set-max-expense/:username')
    async setMaxExpense(
      @Body() setMaxExpenseDto: SetMaxExpenseDto,
      @Param('username') username: string
    ): Promise<Expense> {
      setMaxExpenseDto.username = username; // Set the username from the URL
      return this.expenseService.setMaxMonthlyExpense(setMaxExpenseDto);
    }

    //get All
    @Get('getAll/:username')
    async getAllExpense(@Param('username') username: string):Promise<Expense[]>{
      return this.expenseService.findAll(username);
    }


    //Pie chart
    @Get('user-expenses')
    async getUserExpenses(
      @Query('username') username: string
    ): Promise<Expense[]> {
      return this.expenseService.findUserExpensesForCurrentMonth(username);
    }


    //Line Graph
    @Get('monthly-expenses')
    async getDailyExpenses(@Query('username') username: string) {
      const expenses = await this.expenseService.getTotalExpensesPerDay(username);
      return expenses; // Returns the daily expenses for each day in the current month
    }



    //Total expenses in month
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


    //Get total from database
    @Get('total-monthly')
    async getTotalMonthlyExpenses(@Query() query: GetMonthlyExpensesDto) {
      return await this.expenseService.getTotalMonthlyExpenses(query);
    }

}
    