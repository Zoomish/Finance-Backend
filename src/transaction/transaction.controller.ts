import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    UsePipes,
    UseGuards,
    Req,
    Query,
} from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { AuthorGuard } from 'src/guard/author.guard'

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
        return this.transactionService.create(
            createTransactionDto,
            +req.user.id
        )
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req) {
        return this.transactionService.findAll(+req.user.id)
    }

    @Get('pagination')
    @UseGuards(JwtAuthGuard)
    getAllWithPagination(
        @Req() req,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        return this.transactionService.getAllWithPagination(
            +req.user.id,
            +page,
            +limit
        )
    }

    @Get(':type')
    @UseGuards(JwtAuthGuard, AuthorGuard)
    findAll(@Param('id') id: string) {
        return this.transactionService.findAll(+id)
    }
    @Get(':type/find')
    @UseGuards(JwtAuthGuard, AuthorGuard)
    find(@Param('id') id: string) {
        return this.transactionService.findOne(+id)
    }

    @Get(':type/:id')
    @UseGuards(JwtAuthGuard, AuthorGuard)
    findOne(@Param('id') id: string) {
        return this.transactionService.findOne(+id)
    }

    @Patch(':type/:id')
    @UseGuards(JwtAuthGuard, AuthorGuard)
    update(
        @Param('id') id: string,
        @Body() updateTransactionDto: UpdateTransactionDto
    ) {
        return this.transactionService.update(+id, updateTransactionDto)
    }

    @Delete(':type/:id')
    @UseGuards(JwtAuthGuard, AuthorGuard)
    remove(@Param('id') id: string) {
        return this.transactionService.remove(+id)
    }
}
