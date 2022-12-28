import { Whatsapp } from './../Helpers/whatsapp.helper';
import { BadRequestException } from '@nestjs/common';
import { UserService } from './../User/Shared/user.service';
import { User } from './../User/Shared/user.entity';
import { SwaggerAuth } from './../swagger/index-auth.swagger';
import { Login } from './shared/auth.entity';
import { AuthService } from './shared/auth.service';
import { LocalAuthGuard } from './../User/Shared/local-auth.guard';
import { Controller, UseGuards, Request, Post, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiBody, ApiResponse } from '@nestjs/swagger/dist';
import { Body } from '@nestjs/common/decorators';

@Controller('v1/auth')
@ApiTags('Authorization')
export class AuthController { 

    constructor (private authService : AuthService, private userService: UserService) { }
    

    @UseGuards(LocalAuthGuard) 
    @Post('login')
    @HttpCode(200)
    @ApiOperation({ summary: 'Make the login with credentials in database.'})
    @ApiBody({ type: Login })
    @ApiResponse({
        status: 200,
        type: SwaggerAuth,
    })
    public async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user in database.'})
    @ApiBody({ type: User })
    @ApiResponse({
        status: 200,
        type: SwaggerAuth,
    })
    public async resgister(@Body() user: User) {
        try {
            const newUser = await this.userService.create(user);
            if (newUser === null) {
                throw new BadRequestException();
            }
            const message = `Olá Sr/Sra ${user.name}, Seja bem vindo ao HappyWallet, aproveite os 30 lançamentos mensais disponiveis para usuarios FREE!`;
            await Whatsapp.sendAMessage(user.phone, message);
            return { message: 'Usuario criado com sucesso! '};
        } catch {
            throw new BadRequestException("Usuario ja exise no banco de dados");
        }
    }
}
