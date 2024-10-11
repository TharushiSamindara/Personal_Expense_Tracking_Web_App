/*import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpenseDto, GetMonthlyExpensesDto, RemoveExpenseDto, SetMaxExpenseDto, SetMaxMonthlyExpenseDto, UpdateExpenseDto } from './dto/create-expense.dto';
import { Expense, ExpenseDocument } from './schema/expense.schema';
import { NewExpenseDto } from './dto/new-expense.dto';


@Injectable()
export class ExpenseService {
  
  constructor(
    @InjectModel(Expense.name) 
    private expenseModel: Model<ExpenseDocument>
) {}


async addExpense(username: string, expense: NewExpenseDto): Promise<Expense> {
  
  try {
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

  } catch (error) {
    console.error('Error adding expense:', error);
    throw new NotFoundException('Could not add expense');
  }
}

//get All
async findAll(username:string): Promise<Expense[]> {
  const expense = await this.expenseModel.find({username});
  return expense;
}


//this for return date wise amount of expenses
async addExpenseDayWise(username: string, expense: { name: string; amount: number; date: string }): Promise<Expense> {
  // Find the user expense document
  const userExpenses = await this.expenseModel.findOne({ username }).exec();
  const expenseDate = new Date(expense.date).toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'

  if (userExpenses) {
      // Add the new expense to newExpenses array
      userExpenses.newExpenses.push(expense);

      // Update the dailyTotals map for the given date
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
              [expenseDate]: expense.amount,
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

  //remove expense
  async removeExpense(removeExpenseDto: RemoveExpenseDto) {
    const { username, name, amount, date } = removeExpenseDto;

    // Find the expense document for the user
    const expenseDoc = await this.expenseModel.findOne({ username });

    if (!expenseDoc) {
      throw new Error('Expense not found for this user');
    }

    // Logic to remove expense by name and amount
    const newExpenses = expenseDoc.newExpenses.filter(exp => {
      // If date is provided, match with the date; otherwise, ignore the date
      if (date) {
        return !(exp.name === name && exp.amount === amount && exp.date === date);
      }
      return !(exp.name === name && exp.amount === amount); // Ignore date in the check
    });

    // Update the expense document
    expenseDoc.newExpenses = newExpenses;
    await expenseDoc.save();

    return { newExpenses };
  }

  
  
  

    async updateExpense(updateExpenseDto: UpdateExpenseDto) {
      const { username, name, amount, date } = updateExpenseDto;
  
      // Find the expense document for the user
      const expenseDoc = await this.expenseModel.findOne({ username });
  
      if (!expenseDoc) {
        throw new Error('Expense not found for this user');
      }
  
      // Find the specific expense to update
      const expenseToUpdate = expenseDoc.newExpenses.find(exp => {
        // If date is provided, match with the date; otherwise, ignore the date
        if (date) {
          return exp.name === name && exp.amount === amount && exp.date === date;
        }
        return exp.name === name && exp.amount === amount; // Ignore date in the check
      });
  
      if (!expenseToUpdate) {
        throw new Error('Expense not found to update');
      }
  
      // Update the expense amount (you can update more fields if needed)
      expenseToUpdate.amount = amount; // You can modify this to update other fields
  
      // Update the expense document
      await expenseDoc.save();
  
      return { newExpenses: expenseDoc.newExpenses };
    }

    async getTotalMonthlyExpenses(getMonthlyExpensesDto: GetMonthlyExpensesDto) {
      const { username } = getMonthlyExpensesDto;
  
      // Find the expense document for the user
      const expenseDoc = await this.expenseModel.findOne({ username });
  
      if (!expenseDoc) {
        throw new Error('No expenses found for this user');
      }
  
      const currentMonth = new Date().getMonth(); // Get the current month (0-11)
      const currentYear = new Date().getFullYear(); // Get the current year
  
      // Filter expenses for the current month
      const totalExpenses = expenseDoc.newExpenses.reduce((total, expense) => {
        const expenseDate = new Date(expense.date);
        if (
          expenseDate.getMonth() === currentMonth &&
          expenseDate.getFullYear() === currentYear
        ) {
          return total + expense.amount;
        }
        return total;
      }, 0);
  
      return { totalExpenses };
    }


  
      async setMaxMonthlyExpense(dto: SetMaxMonthlyExpenseDto) {
        const { username, maxMonthlyExpense } = dto;
    
        // Find the user's latest expense and update it
        const expense = await this.expenseModel
          .findOne({ username })
          .sort({ date: -1 })
          .exec();
    
        if (expense) {
          expense.maxMonthlyExpense = maxMonthlyExpense;
          await expense.save();
        } else {
          throw new NotFoundException('User expenses not found');
        }
    
        return maxMonthlyExpense;
      }

      async getMaxMonthlyExpense(username: string) {
        const expense = await this.expenseModel
            .findOne({ username })
            .sort({ date: -1 })
            .exec();
    
        return { maxMonthlyExpense: expense ? expense.maxMonthlyExpense : 0 };
    }
    
    
    async getBalance(username: string) {
      const userExpenses = await this.expenseModel.findOne({ username }).exec();
  
      if (!userExpenses) {
          throw new NotFoundException('User expenses not found');
      }
  
      const totalExpenses = userExpenses.newExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      const maxMonthlyExpense = userExpenses.maxMonthlyExpense || 0; // Use a fallback if not set
  
      const balance = maxMonthlyExpense - totalExpenses;
  
      return {
          balance,
          maxMonthlyExpense,
          totalExpenses,
      };
  }
  
  
}*/


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpenseDto, RemoveExpenseDto, SetMaxMonthlyExpenseDto, UpdateExpenseDto, GetMonthlyExpensesDto } from './dto/create-expense.dto';
import { Expense, ExpenseDocument } from './schema/expense.schema';
import { NewExpenseDto } from './dto/new-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(@InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>) {}

  async addExpense(username: string, expense: NewExpenseDto): Promise<Expense> {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const existingRecord = await this.expenseModel.findOne({ username });

      if (existingRecord) {
        const expenseIndex = existingRecord.newExpenses.findIndex(exp => {
          const expDate = new Date(exp.date);
          return exp.name === expense.name && expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
        });

        if (expenseIndex !== -1) {
          existingRecord.newExpenses[expenseIndex].amount += expense.amount;
        } else {
          existingRecord.newExpenses.push(expense);
        }
        return existingRecord.save();
      } else {
        const newExpenseRecord = new this.expenseModel({ username, newExpenses: [expense] });
        return newExpenseRecord.save();
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      throw new NotFoundException('Could not add expense');
    }
  }

  async findAll(username: string): Promise<Expense[]> {
    return this.expenseModel.find({ username }).exec();
  }

  async findUserExpensesForCurrentMonth(username: string): Promise<Expense[]> {
    const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    return this.expenseModel.find({
      username,
      'newExpenses.date': { $gte: startDate.toISOString(), $lte: endDate.toISOString() },
    }).exec();
  }

  async getTotalExpensesPerDay(username: string) {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const userExpenses = await this.expenseModel.findOne({ username }).exec();
    if (!userExpenses || !userExpenses.newExpenses) return [];

    const dailyExpenses = userExpenses.newExpenses.reduce((acc, expense) => {
      const expenseDate = new Date(expense.date);
      if (expenseDate >= startOfMonth && expenseDate <= endOfMonth) {
        const date = expenseDate.toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + expense.amount;
      }
      return acc;
    }, {});

    return Object.keys(dailyExpenses).map(date => ({
      date,
      totalAmount: dailyExpenses[date],
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  async getTotalExpenses(username: string): Promise<number> {
    const userExpenses = await this.expenseModel.findOne({ username }).exec();
    return userExpenses ? userExpenses.newExpenses.reduce((sum, expense) => sum + expense.amount, 0) : 0;
  }

  async removeExpense(removeExpenseDto: RemoveExpenseDto) {
    const { username, name, amount, date } = removeExpenseDto;

    const expenseDoc = await this.expenseModel.findOne({ username });
    if (!expenseDoc) throw new Error('Expense not found for this user');

    const newExpenses = expenseDoc.newExpenses.filter(exp => {
      if (date) {
        return !(exp.name === name && exp.amount === amount && exp.date === date);
      }
      return !(exp.name === name && exp.amount === amount);
    });

    expenseDoc.newExpenses = newExpenses;
    await expenseDoc.save();
    return { newExpenses };
  }

  async updateExpense(updateExpenseDto: UpdateExpenseDto) {
    const { username, name, amount, date } = updateExpenseDto;

    const expenseDoc = await this.expenseModel.findOne({ username });
    if (!expenseDoc) throw new Error('Expense not found for this user');

    const expenseToUpdate = expenseDoc.newExpenses.find(exp => {
      if (date) {
        return exp.name === name && exp.amount === amount && exp.date === date;
      }
      return exp.name === name && exp.amount === amount;
    });

    if (!expenseToUpdate) throw new Error('Expense not found to update');

    expenseToUpdate.amount = amount;
    await expenseDoc.save();
    return { newExpenses: expenseDoc.newExpenses };
  }

  async setMaxMonthlyExpense(dto: SetMaxMonthlyExpenseDto) {
    const { username, maxMonthlyExpense } = dto;

    const expense = await this.expenseModel.findOne({ username }).exec();
    if (!expense) throw new NotFoundException('User expenses not found');

    expense.maxMonthlyExpense = maxMonthlyExpense;
    await expense.save();
    return maxMonthlyExpense;
  }

  async getMaxMonthlyExpense(username: string) {
    const expense = await this.expenseModel.findOne({ username }).exec();
    return { maxMonthlyExpense: expense ? expense.maxMonthlyExpense : 0 };
  }

  async getBalance(username: string) {
    const userExpenses = await this.expenseModel.findOne({ username }).exec();
    if (!userExpenses) throw new NotFoundException('User expenses not found');

    const totalExpenses = userExpenses.newExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const maxMonthlyExpense = userExpenses.maxMonthlyExpense || 0;
    const balance = maxMonthlyExpense - totalExpenses;

    return { balance};
  }

  async getTotalMonthlyExpenses(getMonthlyExpensesDto: GetMonthlyExpensesDto) {
    const { username } = getMonthlyExpensesDto;

    const expenseDoc = await this.expenseModel.findOne({ username });
    if (!expenseDoc) throw new Error('No expenses found for this user');

    const currentMonth = new Date().getMonth();
    const monthlyExpenses = expenseDoc.newExpenses.filter(expense => new Date(expense.date).getMonth() === currentMonth);

    const totalAmount = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return { totalAmount };
  }
}

