import { EntryService } from './shared/entry.service';
import { EntrySchema } from './schema/entry.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "entries", schema: EntrySchema }])
    ],
    controllers: [
       ],
    providers: [
        EntryService,],
    exports: [
        EntryService, 
    ]
})
export class EntryModule { }
