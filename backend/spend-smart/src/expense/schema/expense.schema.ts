/*import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema()
export class Expense extends Document{
  @Prop({ required: true })
  username: string;

  @Prop({ type: [{ name: String, amount: Number, date: String }] })
  newExpenses: {
    name: string;
    amount: number;
    date: string;
  }[];
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);*/

/*import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema()
export class Expense extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ type: [{ name: String, amount: Number, date: String }] })
  newExpenses: {
    name: string;
    amount: number;
    date: string;
  }[];

  // New field to store total expenses per day
  @Prop({ type: Map, of: Number, default: {} })
  dailyTotals: Map<string, number>; 

  @Prop({ type: Map, of: [{ name: String, amount: Number, date: String }], default: {} })
  monthlyExpenses: Map<string, { name: string; amount: number; date: string }[]>;

  @Prop({ required: true, default: 0 })
  maxMonthlyExpense: number;

  
}


export const ExpenseSchema = SchemaFactory.createForClass(Expense);
*/

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema()
export class Expense {
  @Prop({ required: true })
  username: string;

  @Prop({ type: [{ name: String, amount: Number, date: String }] })
  newExpenses: {
    name: string;
    amount: number;
    date: string;
  }[];

  @Prop({ type: Map, of: Number }) // Example for daily totals
  dailyTotals: Map<string, number>;

  @Prop({ type: Map, of: [Object] }) // Monthly expenses can be stored as an array of objects
  monthlyExpenses: Map<string, Array<{ name: string; amount: number; date: string }>>;

  @Prop({ type: Number, default: 0 }) // Default max monthly expense
  maxMonthlyExpense: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
