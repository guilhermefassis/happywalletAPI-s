import { ApiProperty } from "@nestjs/swagger";

export class UpdateExpenseDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    paymentDate: string;
    @ApiProperty()
    amount: number
}