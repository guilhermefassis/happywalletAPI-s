import { Document } from 'mongoose';

export class Entry extends Document {
    user_id: string;
    entry_type: string;
    entry_id: string;
    date: Date
}