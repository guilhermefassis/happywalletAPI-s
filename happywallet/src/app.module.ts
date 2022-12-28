import { EntryModule } from './Entry/entry.module';
import { UserModule } from './User/user.module';
import { AuthModule } from './Auth/auth.module';
import { ExpenseModule } from './Expense/expense.module';
import { IncomeModule } from './Income/income.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    EntryModule,
    UserModule,
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://root:root@happywalletdb.ydvs1px.mongodb.net/?retryWrites=true&w=majority'),
    IncomeModule,
    ExpenseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
