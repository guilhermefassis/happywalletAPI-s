import { jwtConstants } from './shared/constants';
import { JwtStrategy } from './shared/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../User/user.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './shared/local.strategy';
import { AuthService } from './shared/auth.service';
import { Module } from '@nestjs/common';


@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '12000s'}
        })
    ],
    controllers: [
        AuthController,],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy
    ],
    exports: []
})
export class AuthModule { }
