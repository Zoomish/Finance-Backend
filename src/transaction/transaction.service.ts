import { Injectable } from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>
    ) {}
    async create(createTransactionDto: CreateTransactionDto, id: number) {
        return this.transactionRepository.save({
            ...createTransactionDto,
            user: { id },
        })
    }

    async findAll() {
        return `This action returns all transaction`
    }

    async findOne(id: number) {
        return `This action returns a #${id} transaction`
    }

    async update(id: number, updateTransactionDto: UpdateTransactionDto) {
        return `This action updates a #${id} transaction`
    }

    async remove(id: number) {
        return `This action removes a #${id} transaction`
    }
}
