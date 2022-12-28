import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateIncomeDto {
    @ApiPropertyOptional()
    title: string;
    @ApiPropertyOptional()
    amount: number;
}