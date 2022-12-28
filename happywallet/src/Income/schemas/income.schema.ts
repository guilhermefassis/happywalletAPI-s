import * as mongoose from 'mongoose';

export const IncomeSchema = new mongoose.Schema(
    {
        user_id: {type: String},
        title: {type: String, require: true},
        date: {type: Date},
        amount: {type: Number, require: true}
    },
    {
        versionKey: false
    }
);