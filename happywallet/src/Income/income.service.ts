import { BalanceEntity } from './../Models/balance-entity';
import { Whatsapp } from './../Helpers/whatsapp.helper';
import { EntryService } from '../Entry/shared/entry.service';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UpdateIncomeDto } from './shared/update-income.dto';
import { Income } from './income.entity';
import { Injectable } from '@nestjs/common';
import { DateHelper } from '../Helpers/date.helper';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { ReadIncomeDto } from './shared/read-income.dto';
import { MapperHelper } from '../Helpers/mapper.helper';
import { BalanceHelper } from '../Helpers/balance.helper';

@Injectable()
export class IncomeServices {
  constructor(
    @InjectModel('incomes') private readonly incomeModel: Model<Income>, private readonly entryService: EntryService) { }

  public async create(income: Income, user: any): Promise<Income> {

    income.date = new Date();
    if (user != null) {
      income.user_id = user.id;
    } else {
      throw new UnauthorizedException();
    }
    const createdIncome = new this.incomeModel(income);

    const entry = {
      entry_id: createdIncome._id,
      entry_type: "INCOME",
      date: null,
      user_id: null
    }

    try {
      await this.entryService.create(user, entry);
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
    const message = `Olá Sr/Sra ${user.name}, você acabou de fazer uma entrada do tipo receita de titulo: ${income.title}, no valor de: R$ ${income.amount} reais`;
    const response = await Whatsapp.sendAMessage(user.phone, message);
    if (response != 200) {
      throw new BadRequestException('Envio de mensagem pelo whatsapp falou!');
    }
    
    return await createdIncome.save();
  }

  public async get(user: any, page: number, size: number): Promise<ReadIncomeDto[]> {
    const response = await this.incomeModel.find({ user_id: user.id }).skip(page).limit(size).exec();
    return await MapperHelper.mapperListOfIncomes(response);
  }

  public async getById(id: string, user: any): Promise<ReadIncomeDto> {
    const response = await this.incomeModel.findById(id).exec();
    if (!(response.user_id === user.id)) {
      throw new UnauthorizedException();
    } else {
      const incomeDto = new ReadIncomeDto();
      incomeDto.id = response.id;
      incomeDto.amount = response.amount;
      incomeDto.date = DateHelper.formatDate(response.date);
      incomeDto.title = response.title;

      return incomeDto;
    }
  }

  public async getByMonth(page: number, size: number, month: number, user: any): Promise<ReadIncomeDto[]> {
    const response = (await this.incomeModel.find({ user_id: user.id }).skip(page).limit(size)).filter(item => (Number(item.date.getMonth()) + 1) === Number(month));
    return await MapperHelper.mapperListOfIncomes(response);
  }

  public async update(id: string, income: UpdateIncomeDto, user: any): Promise<ReadIncomeDto> {
    const income_ = await this.incomeModel
      .findById({ _id: id })
      .exec();

    if (!(income_.user_id === user.id)) {
      throw new UnauthorizedException();
    }

    const response = await this.incomeModel.findByIdAndUpdate({ _id: id }, income).exec()
    const incomeDto = new ReadIncomeDto();

    income.amount === response.amount ||
      income.amount === null ||
      income.amount === 0
      ? (incomeDto.amount = response.amount)
      : (incomeDto.amount = income.amount);

    income.title === response.title ||
      income.title === null ||
      income.title === ''
      ? (incomeDto.title = response.title)
      : (incomeDto.title = income.title);

    incomeDto.id = response.id;
    incomeDto.date = DateHelper.formatDate(response.date);
    
    return incomeDto;
  }

  public async delete(id: string, user: any): Promise<Income> {
    const response = await this.incomeModel.findById({ _id: id }).exec();
    if (!(response.user_id === user.id)) {
      throw new UnauthorizedException();
    } else {
      await this.incomeModel.findByIdAndDelete({ _id: id }).exec();
    }
    return response;
  }

  public async getBalance(user: any, month: number, page: number, size: number): Promise<BalanceEntity> {
    const response = await this.incomeModel.find({ user_id: user.id }).skip(page).limit(size).exec();
    const balance = new BalanceEntity();
    balance.type = 'Income';
    if(response.length === 0) {
      balance.value = -1000
      return balance;
    }

    if (month === 0) {
      balance.value = await BalanceHelper.balanceIncome(response);
    } else {
      const filterResponse = response.filter(item => (Number(item.date.getMonth()) + 1) === Number(month));
      balance.value = await BalanceHelper.balanceIncome(filterResponse);
    }
    balance.month = DateHelper.convertNumberInMonth(month);

    return balance;

  }
}
