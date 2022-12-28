import { UpdateExpenseDto } from './shared/update-expenses.dto';
import { ReadExpenseDto } from './shared/read-expenses.dto';
import { SwaggerExpenses } from './../swagger/index-expense.swagger';
import { ExpenseServices } from './expense.service';
import { Controller, Post, Body, Get, Param, Put, Delete, Request, UseGuards, BadRequestException, NotFoundException, HttpCode, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { Expense } from './expense.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../Auth/shared/jwt-auth.guard';
import { BalanceEntity } from '../Models/balance-entity';


@Controller('v1/expenses')
@ApiTags('Expenses')
export class ExpenseController {

    constructor(private expenseServices: ExpenseServices) {

    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new expense' })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({
        status: 201,
        type: SwaggerExpenses
    })
    public async create(@Body() expense: Expense, @Request() req: any): Promise<Expense> {
        try {
            return await this.expenseServices.create(expense, req.user);
        } catch(err) {
            throw new UnauthorizedException(err.message);
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all expenses by logged user' })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({
        status: 200,
        type: SwaggerExpenses,
        isArray: true
    })
    public async get(@Request() req: any): Promise<ReadExpenseDto[]> {
        try {
            const countSize = Number(req.query.size) || 5;
            const countPage = countSize * Number(req.query.page) || 0;
            const month = Number(req.query.month) || 'All';

            if (month === 'All') {
                return await this.expenseServices.get(req.user, countPage, countSize);
            } else {
                return await this.expenseServices.getByMonth(countPage, countSize, month, req.user);
            }
        } catch (err){
            throw new BadRequestException(err.message);
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

            return await this.expenseServices.getBalance(req.user, month, countPage, countSize);
        } catch {
            throw new BadRequestException();
        }
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get expense by id among user expense' })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({
        status: 200,
        type: SwaggerExpenses
    })
    public async getById(@Param('id') id: string, @Request() req: any): Promise<ReadExpenseDto> {
        try {
        return await this.expenseServices.getById(id, req.user);
        } catch {
            throw new NotFoundException('Requisição invalida, usuario nao encontrado!');
        }
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update expense' })
    @HttpCode(202)
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({
        status: 200,
        type: SwaggerExpenses
    })
    public async update(@Param('id') id: string, @Body() expense: UpdateExpenseDto, @Request() req: any): Promise<ReadExpenseDto> {
        try {
        return await this.expenseServices.update(id, expense, req.user);
        } catch {
            throw new NotAcceptableException('Operação invalida');
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete one expense' })
    @HttpCode(202)
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({
        status: 200,
        type: SwaggerExpenses
    })
    public async delete(@Param('id') id: string, @Request() req: any): Promise<Expense> {
        
        try {
            return await this.expenseServices.delete(id, req.user);
        } catch {
            throw new BadRequestException();
        }
    }
}