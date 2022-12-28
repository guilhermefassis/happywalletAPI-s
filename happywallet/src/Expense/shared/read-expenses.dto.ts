import { ApiProperty } from "@nestjs/swagger";

export class ReadExpenseDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    date: string;
    @ApiProperty()
    paymentDate: string;
    @ApiProperty()
    amount: number
}