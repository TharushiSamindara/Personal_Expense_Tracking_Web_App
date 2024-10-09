/*import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './schema/expense.schema';

@Module({
  //imports:[MongooseModule.forFeature([{name:'Expense', schema:ExpenseSchema}])],
  imports: [
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService]
})
export class ExpenseModule {}*/

// src/expenses/expenses.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { Expense, ExpenseSchema } from './schema/expense.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }])],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpensesModule {}

export { Expense };

