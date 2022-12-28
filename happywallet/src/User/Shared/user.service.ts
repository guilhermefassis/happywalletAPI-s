import { User } from './user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from '../../Models/plans-enum';
import { Whatsapp } from './../../Helpers/whatsapp.helper';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    public async getByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }

    public async getByCpf(cpf: string): Promise<User> {
        return await this.userModel.findOne({ ssn: cpf }).exec();
    }

    public async create(user: User): Promise<any> {
        const email = await this.getByEmail(user.email);
        const ssn = await this.getByCpf(user.ssn);
        if (email !== null) {
            return null;
        } else if (ssn !== null) {
            return null;
        } else {
            const crypt = bcrypt.hashSync(user.password, 8);
            user.password = crypt;
            const createdUser = new this.userModel(user);
            return await createdUser.save();
        }
    }

    public async update(id: string, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate({ _id: id }, user).exec();
    }

    public async turnToPro(user: any) {
        const currentUser = await this.userModel.findById(user.id);
        try {
            if(currentUser.role === Role.FREE) {
                currentUser.role = Role.PRO;
                await this.update(currentUser.id, currentUser);
                const message = `Olá Sr/Sra ${user.name}, Seja bem vindo ao plano PRO! com lançamentos ilimitados`;
                await Whatsapp.sendAMessage(user.phone, message);
                return { Message: 'Parabens, você assinou o plano PRO'};
            } else {
                throw new UnauthorizedException('Seu plano já é o pro');
            }
        } catch(err) {
            throw new UnauthorizedException(err.message);
        }
    }

    public async turnToFree(user: any) {
        const currentUser = await this.userModel.findById(user.id);

        if (currentUser.role === Role.PRO) {
            currentUser.role = Role.FREE;
            await this.update(currentUser.id, currentUser);
            const message = `Olá Sr/Sra ${user.name}, Aguardamos você no plano PRO novamente !`;
            await Whatsapp.sendAMessage(user.phone, message);
            return { Message: 'Seu plano é o free agora'};
        } else {
            throw new UnauthorizedException('Seu plano já é o free');
        }
    }

}
