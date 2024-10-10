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

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
  dailyTotals: Map<string, number>; // Stores totals like { "2024-10-01": 1000, "2024-10-02": 2000 }

  @Prop({ required: true, default: 0 })
  maxMonthlyExpense: number;
}


export const ExpenseSchema = SchemaFactory.createForClass(Expense);
