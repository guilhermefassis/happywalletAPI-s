import { EntryModule } from '../Entry/entry.module';
import { IncomeSchema } from './schemas/income.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { IncomeController } from './income.controller';
import { Module } from "@nestjs/common";
import { IncomeServices } from './income.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'incomes', schema: IncomeSchema}]),
        EntryModule,
    ],
    controllers: [IncomeController],
    providers: [
        IncomeServices,
    ]
})
export class IncomeModule {}