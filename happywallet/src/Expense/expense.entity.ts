import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class Expense extends Document {
    user_id: string;
    @ApiProperty()
    title: string;
    date: Date;
    @ApiProperty()
    paymentDate: Date;
    @ApiProperty()
    amount: number
}