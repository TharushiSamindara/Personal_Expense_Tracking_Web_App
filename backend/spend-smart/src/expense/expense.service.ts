import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpenseDto, RemoveExpenseDto, SetMaxMonthlyExpenseDto, UpdateExpenseDto, GetMonthlyExpensesDto, GetExpensesDto } from './dto/create-expense.dto';
import { Expense, ExpenseDocument } from './schema/expense.schema';
import { NewExpenseDto } from './dto/new-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(@InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>) {}

  /*async addExpense(username: string, expense: NewExpenseDto): Promise<Expense> {
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
  }*/

    async addExpense(username: string, expense: NewExpenseDto): Promise<Expense> {
      try {
        // Find an existing record for the username.
        const existingRecord = await this.expenseModel.findOne({ username });
    
        if (existingRecord) {
          // Add the new expense directly without modifying the date or amount.
          existingRecord.newExpenses.push(expense);
          return existingRecord.save();
        } else {
          // If no existing record is found, create a new one.
          const newExpenseRecord = new this.expenseModel({
            username,
            newExpenses: [expense],
          });
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
    try {
        const { username, name, amount, date } = updateExpenseDto;

        // Log incoming DTO
        console.log('Update DTO:', updateExpenseDto);

        // Step 1: Find the user's expense document.
        const expenseDoc = await this.expenseModel.findOne({ username });
        if (!expenseDoc) {
            console.error('Expense document not found for this user');
            throw new Error('Expense document not found for this user');
        }

        // Log the fetched expenseDoc
        console.log('Fetched expenseDoc:', expenseDoc);

        // Step 2: Locate the expense entry in `newExpenses` for the given date and name.
        const expenseIndex = expenseDoc.newExpenses.findIndex(
            exp => exp.name === name && exp.date === date
        );

        // Log the index and condition
        console.log('Expense Index:', expenseIndex);

        // If the expense for the given name and date is found, update it.
        if (expenseIndex !== -1) {
            // Step 3: Replace the amount with the new value.
            expenseDoc.newExpenses[expenseIndex].amount = amount;

            // Step 4: Save the updated expense document back to the database.
            await expenseDoc.save();

            console.log('Expense updated successfully');
            return { newExpenses: expenseDoc.newExpenses, message: 'Expense updated successfully' };
        } else {
            console.error('Expense for the given name and date not found');
            throw new Error('Expense for the given name and date not found');
        }
    } catch (error) {
        console.error('Error updating expense:', error);
        throw new Error(`Failed to update the expense: ${error.message}`);
    }
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

  //For filter
  async getExpensesByDate(username: string, date: string): Promise<Expense[]> {
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    try {
        return await this.expenseModel.find({
            username,
            date: { $gte: startOfDay, $lt: endOfDay }
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw new Error('Could not fetch expenses');
    }
}

}

