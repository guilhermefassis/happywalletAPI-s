import { UserService } from './../../User/Shared/user.service';
import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    public async validateUser(userEmail: string, userPassword: string) {
        const user = await this.userService.getByEmail(userEmail);
        if(user && bcrypt.compare(userPassword, user.password)) {
            const { _id, name, email, role, phone } = user;
            return {id: _id, name, email, role, phone};
        }
        return null;
    }

    public async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role, name: user.name, phone: user.phone}
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
