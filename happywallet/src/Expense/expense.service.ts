import { EntryService } from '../Entry/shared/entry.service';
import { BalanceHelper } from '../Helpers/balance.helper';
import { MapperHelper } from '../Helpers/mapper.helper';
import { UpdateExpenseDto } from './shared/update-expenses.dto';
import { ReadExpenseDto } from './shared/read-expenses.dto';
import { Expense } from './expense.entity';
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { DateHelper } from './../Helpers/date.helper';
import { BalanceEntity } from '../Models/balance-entity';
import { Whatsapp } from './../Helpers/whatsapp.helper';

@Injectable()
export class ExpenseServices {
    constructor(@InjectModel('expenses') private readonly expenseModel: Model<Expense>, private readonly entryService: EntryService) { }

    public async create(expense: Expense, user: any): Promise<Expense> {
        expense.date = new Date;
        if (user != null) {
            expense.user_id = user.id;
        } else {
            throw new UnauthorizedException();
        }

        const createExpense = new this.expenseModel(expense);

        const entry = {
            entry_id: createExpense._id,
            entry_type: "EXPENSE",
            date: null,
            user_id: null
        }

        try {
            await this.entryService.create(user, entry);
        } catch (err) {
            throw new UnauthorizedException(err.message);
        }

        const message = `Olá Sr/Sra ${user.name}, você acabou de fazer uma entrada do tipo despesa de titulo: ${expense.title}, no valor de: R$ ${expense.amount} reais`;
        const response = await Whatsapp.sendAMessage(user.phone, message);
        if (response != 200) {
            throw new BadRequestException('Envio de mensagem pelo whatsapp falou!');
        }

        return await createExpense.save();
    }

    public async get(user: any, page: number, size: number): Promise<ReadExpenseDto[]> {
        const response = await this.expenseModel.find({ user_id: user.id }).skip(page).limit(size).exec();
        return await MapperHelper.mapperListOfExpenses(response);
    }

    public async getByMonth(page: number, size: number, month: number, user: any): Promise<ReadExpenseDto[]> {
        const response = (await this.expenseModel.find({ user_id: user.id }).skip(page).limit(size))
            .filter(item => (Number(item.paymentDate.getMonth()) + 1) === Number(month));
        return await MapperHelper.mapperListOfExpenses(response);
    }

    public async getById(id: string, user: any): Promise<ReadExpenseDto> {
        const response = await this.expenseModel.findById(id).exec();
        if (!(response.user_id === user.id)) {
            throw new UnauthorizedException();
        } else {
            const expenseDto = new ReadExpenseDto();
            expenseDto.amount = response.amount;
            expenseDto.id = response.id;
            expenseDto.title = response.title;
            expenseDto.date = DateHelper.formatDate(response.date);
            expenseDto.paymentDate = DateHelper.formatDate(response.paymentDate);

            return expenseDto;
        }
    }

    public async update(id: string, expense: UpdateExpenseDto, user: any): Promise<ReadExpenseDto> {
        const expense_ = await this.expenseModel.findById({ _id: id }).exec();

        if (!(expense_.user_id === user.id)) {
            throw new UnauthorizedException();
        }

        const response = await this.expenseModel.findByIdAndUpdate({ _id: id }, expense).exec();
        const expenseDto = new ReadExpenseDto();

        expense.amount === response.amount ||
            expense.amount === null ||
            expense.amount === 0
            ? (expenseDto.amount = response.amount)
            : (expenseDto.amount = expense.amount);

        expense.title === response.title ||
            expense.title === null ||
            expense.title === ''
            ? (expenseDto.title = response.title)
            : (expenseDto.title = expense.title);

        expenseDto.id = response.id;
        expenseDto.date = DateHelper.formatDate(response.date);
        expenseDto.paymentDate = DateHelper.formatDate(response.paymentDate);

        return expenseDto;
    }

    public async delete(id: string, user: any): Promise<any> {
        const response = await this.expenseModel.findById(id).exec();
        if (!(response.user_id === user.id)) {
            throw new UnauthorizedException();
        } else {
            await this.expenseModel.findOneAndDelete({ _id: id }).exec();
        }
        return response;
    }

    public async getBalance(user: any, month: number, page: number, size: number) {
        const response = await this.expenseModel.find({ user_id: user.id }).skip(page).limit(size).exec();
        const balance = new BalanceEntity();
        balance.type = 'Expense';
        if (month === 0) {
            balance.value = await BalanceHelper.balanceIncome(response);
        } else {
            const filterResponse = response.filter(item => (Number(item.paymentDate.getMonth()) + 1) === Number(month));
            balance.value = await BalanceHelper.balanceIncome(filterResponse);
        }
        balance.month = DateHelper.convertNumberInMonth(month);

        return balance;

    }
}