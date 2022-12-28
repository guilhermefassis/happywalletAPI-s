import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class Income extends Document {
    user_id: string;
    @ApiProperty()
    title: string;
    date: Date;
    @ApiProperty()
    amount: number;
}