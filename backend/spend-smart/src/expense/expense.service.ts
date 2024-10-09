import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense, ExpenseDocument } from './schema/expense.schema';
import { NewExpenseDto } from './dto/new-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) 
    private expenseModel: Model<ExpenseDocument>
) {}

async addExpense(username: string, expense: NewExpenseDto): Promise<Expense> {
    // Find if a user with this username already has expenses saved.
    const existingRecord = await this.expenseModel.findOne({ username });

    if (existingRecord) {
        // If an existing record is found, add the new expense to the expenses array.
        existingRecord.newExpenses.push(expense);
        return existingRecord.save();
    } else {
        // If no existing record is found, create a new one.
        const newExpenseRecord = new this.expenseModel({
            username,
            newExpenses: [expense], // Initialize with the single expense
        });
        return newExpenseRecord.save();
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
  
}
