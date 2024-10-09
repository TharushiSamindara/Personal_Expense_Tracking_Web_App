import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";
import { Expense } from "./schema/expense.schema";
import { CreateExpenseDto, ExpenseDto, UpdateExpenseDto } from "./dto/create-expense.dto";

@Injectable()
export class ExpenseService {
    
    constructor(
        @InjectModel(Expense.name)
        private expenseModel : mongoose.Model<Expense>,
    ){}
    
    //get all
    async findAll(): Promise<{ username: string; expenses: { name: string; amount: number }[] }[]> {
        const expenses = await this.expenseModel.find().select('username expenses'); // Select only the username and expenses fields

        // Map the results to the desired format
        return expenses.map(expense => ({
            username: expense.username,
            expenses: expense.expenses,
        }));
    }

    //create expense
    async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
        try {
            const { username, expenses } = createExpenseDto;
    
            // Create a new Expense document
            const createdExpense = new this.expenseModel({ username, expenses });
            
            return await createdExpense.save();
        } catch (error) {
            console.error('Error creating expense:', error); // Log the error
            throw new InternalServerErrorException('Could not create expense'); // Throw a more user-friendly error
        }
    }

    /*//add more expenses
    async addExpenses(username: string, newExpenses: ExpenseDto[]): Promise<Expense> {
        try {
            // Find the user by username
            const expenseRecord = await this.expenseModel.findOne({ username });
    
            if (!expenseRecord) {
                throw new NotFoundException('User not found');
            }
    
            // Push new expenses to the existing expenses array
            expenseRecord.expenses.push(...newExpenses);
            
            return await expenseRecord.save();
        } catch (error) {
            console.error('Error adding expenses:', error);
            throw new InternalServerErrorException('Could not add expenses');
        }
    }*/

    async addExpenses(username: string, newExpenses: ExpenseDto[]): Promise<Expense> {
        try {
            // Find the user by username
            const expenseRecord = await this.expenseModel.findOne({ username });
    
            if (!expenseRecord) {
                throw new NotFoundException('User not found');
            }
    
            // Push new expenses to the existing expenses array
            expenseRecord.expenses.push(...newExpenses);
    
            return await expenseRecord.save();
        } catch (error) {
            console.error('Error adding expenses:', error);
            throw new InternalServerErrorException('Could not add expenses');
        }
    }
    

    //get only expenses for relevent user
    async findByUsername(username: string): Promise<{ username: string; expenses: { name: string; amount: number }[] }> {
        const expenseRecord = await this.expenseModel.findOne({ username });

        if (!expenseRecord) {
            throw new NotFoundException('User not found');
        }

        return {
            username: expenseRecord.username,
            expenses: expenseRecord.expenses,
        };
    }

    //update expense using expense name
    async updateExpense(username: string, expenseName: string, updateExpenseDto: UpdateExpenseDto): Promise<{ username: string; expenses: { name: string; amount: number }[] }> {
        const expenseRecord = await this.expenseModel.findOne({ username });
    
        if (!expenseRecord) {
            throw new NotFoundException('User not found');
        }
    
        // Find the expense to update
        const expenseToUpdate = expenseRecord.expenses.find(expense => expense.name === expenseName);
    
        if (!expenseToUpdate) {
            throw new NotFoundException('Expense not found');
        }
    
        // Update the fields if they are provided
        if (updateExpenseDto.name !== undefined) {
            expenseToUpdate.name = updateExpenseDto.name;
        }
    
        if (updateExpenseDto.amount !== undefined) {
            expenseToUpdate.amount = updateExpenseDto.amount;
        }
    
        await expenseRecord.save();
    
        return {
            username: expenseRecord.username,
            expenses: expenseRecord.expenses,
        };
    }

    //remove expense
    async removeExpense(username: string, expenseName: string) {
        const expenseRecord = await this.expenseModel.findOne({ username });
    
        if (!expenseRecord) {
            throw new NotFoundException('User not found');
        }

        // Find the expense
        const expenseToDelete = expenseRecord.expenses.findIndex(expense => expense.name === expenseName);
    
        if (expenseToDelete === -1) {
            throw new NotFoundException('Expense not found');
        }

        expenseRecord.expenses.splice(expenseToDelete, 1);
    
        await expenseRecord.save();
    
        return "Delete Expense from " + username;
    }

    //find expense amount when give username and name of expense
    async findByUsernameAndExpenseName (username: string, expenseName: string) { 
        const expenseRecord = await this.expenseModel.findOne({ username });
    
        if (!expenseRecord) {
            throw new NotFoundException('User not found');
        }

        // Find the expense
        const expense = expenseRecord.expenses.find(expense => expense.name === expenseName);
    
        if (!expense) {
            throw new NotFoundException('Expense not found');
        }

        return expense.amount;
    }
    
    
}
