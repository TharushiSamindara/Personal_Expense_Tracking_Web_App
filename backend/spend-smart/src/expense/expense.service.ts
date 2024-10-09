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

/*async addExpense(username: string, expense: NewExpenseDto): Promise<Expense> {
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
}*/
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
  

  
/*async getUserExpenses(username: string): Promise<any> {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Fetch expenses for the current month for the given username
    const expenses = await this.expenseModel.find({
      username: username,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    // Aggregate expenses by name
    const expenseSums = expenses.reduce((acc, expense) => {
      const { name, amount } = expense;
      if (acc[name]) {
        acc[name] += amount;
      } else {
        acc[name] = amount;
      }
      return acc;
    }, {});

    return {
      username,
      data: expenseSums,
    };
  }*/

    /*async getUserExpenses(username: string): Promise<any> {
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
        // Fetch expenses for the current month for the given username
        const expenses = await this.expenseModel.find({
          username: username,
          date: { $gte: startOfMonth, $lte: endOfMonth },
        }).exec(); // Add exec() to get a typed result
    
        // Flatten the newExpenses array and aggregate expenses by name
        const expenseSums = expenses.flatMap((expense: ExpenseDocument) => expense.newExpenses).reduce((acc, newExpense: NewExpenseDto) => {
          const { name, amount } = newExpense; // Destructure from newExpense
          if (acc[name]) {
            acc[name] += amount;
          } else {
            acc[name] = amount;
          }
          return acc;
        }, {});
    
        return {
          username,
          data: expenseSums,
        };
      }*/

        /*async getUserExpenses(username: string): Promise<any> {
            const currentDate = new Date();
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
            // Fetch expenses for the current month for the given username
            const expenses = await this.expenseModel.find({
                username: username,
                date: { $gte: startOfMonth, $lte: endOfMonth },
            }).exec();
        
            // Aggregate expenses by name for the current month
            const expenseSums = expenses.flatMap(expense => expense.newExpenses)
                .reduce((acc, newExpense: NewExpenseDto) => {
                    const { name, amount } = newExpense; // Destructure from newExpense
                    acc[name] = (acc[name] || 0) + amount; // Sum the amounts by name
                    return acc;
                }, {});
        
            return {
                username,
                data: expenseSums,
            };
        }*/
        

}
