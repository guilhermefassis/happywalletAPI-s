import { BalanceEntity } from 'src/Models/balance-entity';
import { UpdateIncomeDto } from './shared/update-income.dto';
import { ReadIncomeDto } from './shared/read-income.dto';
import { SwaggerIncome } from './../swagger/index-income.swagger';
import { Income } from './income.entity';
import { IncomeServices } from './income.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, NotFoundException, BadRequestException, HttpCode, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { JwtAuthGuard } from '../Auth/shared/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('v1/incomes')
@ApiTags('Incomes')
export class IncomeController {

    constructor(private incomeServices: IncomeServices) {

    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new Income' })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({
        status: 201,
        type: SwaggerIncome,
    })
    public async create(@Body() income: Income, @Request() req: any): Promise<Income> {
        try {
            return await this.incomeServices.create(income, req.user);
        } catch (err) {
            throw new UnauthorizedException(err.message);
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all Incomes by logged user' })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({
        status: 200,
        type: SwaggerIncome,
        isArray: true
    })
    public async get(@Request() req: any): Promise<ReadIncomeDto[]> {
        try {
            const countSize = Number(req.query.size) || 5;
            const countPage = countSize * Number(req.query.page) || 0;
            const month = Number(req.query.month) || 'All';

            if (month === 'All') {
                return await this.incomeServices.get(req.user, countPage, countSize);
            } else {
                return await this.incomeServices.getByMonth(countPage, countSize, month, req.user);
            }
        } catch (err) {
            throw new BadRequestException('Requisição invalida' + err.message);
        }
    }

    @Get('balance')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    public async getBalance(@Request() req: any): Promise<BalanceEntity> {
        try {
            const countSize = Number(req.query.size) || 5;
            const countPage = countSize * Number(req.query.page) || 0;
            const month = Number(req.query.month) || 0; 

            return await this.incomeServices.getBalance(req.user, month, countPage, countSize);
        } catch {
            throw new BadRequestException();
        }
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get one Income by your id among user incomes' })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({
        status: 200,
        type: SwaggerIncome,
    })
    public async getById(@Param('id') id: string, @Request() req: any): Promise<ReadIncomeDto> {
        try {
            return await this.incomeServices.getById(id, req.user);
        } catch (err) {
            throw new NotFoundException('Requisição invalida, usuario nao encontrado!');
        }

    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update Income' })
    @HttpCode(202)
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({
        status: 200,
        description: 'return the updated element',
        type: SwaggerIncome,
    })
    public async update(@Param('id') id: string, @Body() income: UpdateIncomeDto, @Request() req: any): Promise<ReadIncomeDto> {
        try {
            return await this.incomeServices.update(id, income, req.user);
        } catch {
            throw new NotAcceptableException('Operação invalida');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(202)
    @ApiOperation({ summary: 'Delete one Income' })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({
        status: 200,
        description: 'return the deleted element',
        type: SwaggerIncome,
    })
    public async delete(@Param('id') id: string, @Request() req: any) {
        try {
            return await this.incomeServices.delete(id, req.user);
        } catch {
            throw new BadRequestException();
        }
        
    }
}