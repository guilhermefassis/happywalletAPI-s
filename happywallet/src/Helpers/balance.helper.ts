import { Income } from "src/Income/income.entity";

export class BalanceHelper {
    public static async balanceIncome(response: Income[]) {
        let balance = 0;
        response.forEach(item => balance += item.amount);
        return balance;
    }
}