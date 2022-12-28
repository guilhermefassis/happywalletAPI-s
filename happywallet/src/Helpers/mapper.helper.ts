import { ReadExpenseDto } from './../Expense/shared/read-expenses.dto';
import { Expense } from "src/Expense/expense.entity";
import { Income } from "src/Income/income.entity";
import { ReadIncomeDto } from "../Income/shared/read-income.dto";
import { DateHelper } from "./date.helper";

export class MapperHelper {

    public static async mapperListOfIncomes(response:Income[]): Promise<ReadIncomeDto[]> {
        const incomesDto: ReadIncomeDto[] = [];
        response.forEach((item) => {
          const incomeDto = new ReadIncomeDto();
          incomeDto.id = item.id;
          incomeDto.date = DateHelper.formatDate(item.date);
          incomeDto.amount = item.amount;
          incomeDto.title = item.title;
    
          incomesDto.push(incomeDto);
        });
    
        return incomesDto;
    }

    public static async mapperListOfExpenses(response: Expense[]): Promise<ReadExpenseDto[]> {
      const expenses: ReadExpenseDto[] = [];

        response.forEach((item) => {
            const expenseDto = new ReadExpenseDto();
            expenseDto.id = item.id;
            expenseDto.amount = item.amount;
            expenseDto.title = item.title;
            expenseDto.date = DateHelper.formatDate(item.date);
            expenseDto.paymentDate = DateHelper.formatDate(item.paymentDate);

            expenses.push(expenseDto);
        });

        return expenses;
    }
}