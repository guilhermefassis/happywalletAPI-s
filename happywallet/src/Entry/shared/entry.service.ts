import { Entry } from './entry.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../../Models/plans-enum';
import { Whatsapp } from './../../Helpers/whatsapp.helper';

@Injectable()
export class EntryService {

    constructor(@InjectModel('entries') private readonly entryModel: Model<Entry>){}

    public async create(user: any, entry: any): Promise<Entry> {
        if(user != null) {
            entry.user_id = user.id;
        } else {
            throw new UnauthorizedException("This user don't exist");
        }

        entry.date = new Date();

        if(user.role === Role.FREE) {
            const amountOfEntrys = await this.getHowManyEntrysInMonth(user.id, (entry.date.getMonth() + 1));
            if(amountOfEntrys >= 20) {
                const message = `Olá Sr/Sra ${user.name}, Seu limite de lançamentos foi alcançado, já pensou em assinar o plano pro?`;
                await Whatsapp.sendAMessage(user.phone, message);
                throw new UnauthorizedException('Number of entrys sold out! Subscribe to the pro plan for more entries in the month');
            }
        }

        const newEntry = new this.entryModel(entry);
        return await newEntry.save();
    }

    public async getHowManyEntrysInMonth(user_id: string, month: number): Promise<number> {
        const response = (await this.entryModel.find( { user_id } )).filter(entry => (entry.date.getMonth() + 1) === month);
        return response.length;
    }
}
