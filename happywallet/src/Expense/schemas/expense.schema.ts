import * as mongoose from 'mongoose';

export const ExpenseSchema = new mongoose.Schema(
    {
        user_id: {type: String},
        title: {type: String, require: true},
        date: {type: Date},
        paymentDate: {type: Date, require: true},
        amount: {type: Number, require: true}
    }, 
    {
        versionKey: false
    }
)