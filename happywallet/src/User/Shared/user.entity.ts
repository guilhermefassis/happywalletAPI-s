import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators';
import { Document } from 'mongoose';

export class User extends Document {
    @ApiProperty()
    name: string;
    @ApiPropertyOptional()
    ssn: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    role: string;
}