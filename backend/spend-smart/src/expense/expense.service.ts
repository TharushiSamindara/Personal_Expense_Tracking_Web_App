import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpenseDto, SetMaxExpenseDto } from './dto/create-expense.dto';
import { Expense, ExpenseDocument } from './schema/expense.schema';
import { NewExpenseDto } from './dto/new-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) 
    private expenseModel: Model<ExpenseDocument>
) {}


async addExpense(username: string, expense: NewExpenseDto): Promise<Expense> {
    // Get the current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Find if a user with this username already has expenses saved.
    const existingRecord = await this.expenseModel.findOne({ username });

    if (existingRecord) {
        // Check if the expense name exists for the current month
        const expenseIndex = existingRecord.newExpenses.findIndex(exp => {
            const expDate = new Date(exp.date);
            return exp.name === expense.name && 
                   expDate.getMonth() === currentMonth && 
                   expDate.getFullYear() === currentYear;
        });

        if (expenseIndex !== -1) {
            // If the expense already exists, update the amount
            existingRecord.newExpenses[expenseIndex].amount += expense.amount; // Add the new amount
        } else {
            // If the expense does not exist for this month, add it as a new expense
            existingRecord.newExpenses.push(expense);
        }
        return existingRecord.save(); // Save the updated record
    } else {
        // If no existing record is found, create a new one.
        const newExpenseRecord = new this.expenseModel({
            username,
            newExpenses: [expense], // Initialize with the single expense
        });
        return newExpenseRecord.save(); // Save the new record
    }
}

//this for return date wise amount of expenses
async addExpenseDayWise(username: string, expense: { name: string; amount: number; date: string }): Promise<Expense> {
    // Find the user expense document
    const userExpenses = await this.expenseModel.findOne({ username }).exec();
  
    if (userExpenses) {
      // Add the new expense to newExpenses array
      userExpenses.newExpenses.push(expense);
  
      // Update the dailyTotals map
      const expenseDate = new Date(expense.date).toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
      const currentTotal = userExpenses.dailyTotals.get(expenseDate) || 0;
      userExpenses.dailyTotals.set(expenseDate, currentTotal + expense.amount);
  
      // Save the updated document
      await userExpenses.save();
      return userExpenses;
    } else {
      // If no document exists, create a new one
      const newExpense = new this.expenseModel({
        username,
        newExpenses: [expense],
        dailyTotals: {
          [new Date(expense.date).toISOString().split('T')[0]]: expense.amount,
        },
      });
  
      await newExpense.save();
      return newExpense;
    }
  }
  
  




async findUserExpensesForCurrentMonth(username: string): Promise<Expense[]> {
    // Get the start and end dates for the current month
    const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    // Find expenses for the given username within the current month
    return this.expenseModel.find({
      username,
      'newExpenses.date': {
        $gte: startDate.toISOString(),
        $lte: endDate.toISOString(),
      },
    }).exec();
  }
  
  


async getTotalExpensesPerDay(username: string) {
    // Get the current date and calculate the start and end of the month
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
    try {
      console.log(`Fetching expenses for user: ${username}, from ${startOfMonth} to ${endOfMonth}`);
  
      // Fetch expenses for the user within the month range
      const userExpenses = await this.expenseModel.findOne({ username }).exec();
      console.log('User expenses:', userExpenses);
  
      // Check if the user has expenses
      if (!userExpenses || !userExpenses.newExpenses) {
        console.log('No expenses found for this user.');
        return [];
      }
  
      // Filter and aggregate the expenses by date
      const dailyExpenses = userExpenses.newExpenses.reduce((acc, expense) => {
        const expenseDate = new Date(expense.date);
  
        // Check if the expense date falls within the current month
        if (expenseDate >= startOfMonth && expenseDate <= endOfMonth) {
          // Format the date as 'YYYY-MM-DD'
          const date = expenseDate.toISOString().split('T')[0];
  
          // Add the expense amount to the corresponding date's total
          acc[date] = (acc[date] || 0) + expense.amount;
        }
  
        return acc;
      }, {});
  
      // Transform the daily expenses into an array of objects sorted by date
      const result = Object.keys(dailyExpenses)
        .map(date => ({
          date: date,
          totalAmount: dailyExpenses[date],
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
      console.log('Aggregated daily expenses:', result);
      return result;
  
    } catch (error) {
      console.error('Error fetching monthly expenses:', error);
      throw error;
    }
  }
  
/*********
  async setMaxMonthlyExpense(setMaxExpenseDto: SetMaxExpenseDto): Promise<Expense> {
    const { username, maxMonthlyExpense } = setMaxExpenseDto;
    const expenseRecord = await this.expenseModel.findOne({ username }).exec();
    
    if (expenseRecord) {
      expenseRecord.maxMonthlyExpense = maxMonthlyExpense;
      await expenseRecord.save();
      return expenseRecord;
    } else {
      throw new Error('User not found');
    }
  }**** */

  async setMaxMonthlyExpense(setMaxExpenseDto: SetMaxExpenseDto): Promise<Expense> {
    const { username, maxMonthlyExpense } = setMaxExpenseDto;
    const expense = await this.expenseModel.findOneAndUpdate(
      { username },
      { maxMonthlyExpense },
      { new: true } // Return the updated document
    );

    if (!expense) {
      throw new Error('Expense record not found for the specified username');
    }

    return expense;
  }


  async addExpenseMonthly(username: string, expense: NewExpenseDto): Promise<Expense> {
    const expenseDate = new Date(expense.date);
    const monthKey = `${expenseDate.getFullYear()}-${expenseDate.getMonth() + 1}`; // Format as "YYYY-MM"

    // Add the expense to the monthly expenses map
    return this.expenseModel.findOneAndUpdate(
      { username },
      { $push: { [`monthlyExpenses.${monthKey}`]: expense } },
      { new: true, upsert: true }
    );
  }

  async getTotalExpenses(username: string): Promise<number> {
    const userExpenses = await this.expenseModel.findOne({ username }).exec();
  
    if (!userExpenses) {
      return 0;
    }
  
    const total = userExpenses.newExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return total;
  }
}
