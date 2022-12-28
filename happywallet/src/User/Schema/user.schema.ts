import { Role } from './../../Models/plans-enum';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        ssn: { type: String, require: true },
        phone: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
        role : {type: String, enum: Role, default: Role.FREE}
    },
    { 
        versionKey: false
    }
)