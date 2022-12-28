import * as mongoose from 'mongoose';

export const EntrySchema = new mongoose.Schema(
    {
        user_id: {type: String},
        entry_type: {type: String},
        entry_id: {type: String},
        date: {type: Date}
    },
    {
        versionKey: false
    }
)