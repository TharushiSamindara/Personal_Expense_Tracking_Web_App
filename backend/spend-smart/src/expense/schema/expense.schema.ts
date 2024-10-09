/*import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Expense extends Document {
    username: string;
    expenses: { name: string; amount: number }[];
}

@Schema({
    timestamps: true,
})
export class Expense {
    @Prop({ required: true })
    username: string;

    @Prop({ type: [{ name: String, amount: Number }], required: true })
    expenses: { name: string; amount: number }[];
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);*/

/*import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Expense extends Document {
    username: string;
    expenses: { name: string; amount: number; date: string }[];
}

@Schema({
    timestamps: true,
})
export class Expense {
    @Prop({ required: true })
    username: string;

    @Prop({ type: [{ name: String, amount: Number, date: String }], required: true })
    expenses: { name: string; amount: number; date: string }[];  // Added date field
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
*/
// src/expense/schemas/expense.schema.ts
/*import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Expense extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);*/
// src/expenses/schemas/expense.schema.ts

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
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
