import { UserController } from './user.controller';
import { UserSchema } from './Schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './Shared/user.service';

import { Module } from '@nestjs/common';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    controllers: [
        UserController,],
    providers: [
        UserService
    ],
    exports: [UserService]
})
export class UserModule { }
