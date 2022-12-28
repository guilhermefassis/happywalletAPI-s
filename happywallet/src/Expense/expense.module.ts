import { EntryModule } from '../Entry/entry.module';
import { ExpenseServices } from './expense.service';
import { ExpenseController } from './expense.controller';
import { ExpenseSchema } from './schemas/expense.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";


@Module({
    imports: [
        MongooseModule.forFeature([{name: 'expenses', schema: ExpenseSchema}]),
        EntryModule
    ],
    controllers: [ExpenseController],
    providers: [ExpenseServices]
})
export class ExpenseModule {}