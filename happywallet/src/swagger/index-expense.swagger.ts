import { ApiProperty } from '@nestjs/swagger';
import { Expense } from './../Expense/expense.entity';

export class SwaggerExpenses extends Expense {
    @ApiProperty()
    id: string;
    @ApiProperty()
    date: Date;
    @ApiProperty()
    paymentDate: Date;
}