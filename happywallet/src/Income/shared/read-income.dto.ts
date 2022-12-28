import { ApiProperty } from "@nestjs/swagger";

export class ReadIncomeDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    date: string;
    @ApiProperty()
    amount: number;
}