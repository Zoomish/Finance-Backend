import { Injectable, NotAcceptableException } from '@nestjs/common'
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

    async findAll(id) {
        return this.transactionRepository.find({
            where: {
                user: { id },
            },
            order: {
                createdAt: 'DESC',
            },
        })
    }

    async findOne(id: number) {
        return await this.transactionRepository.findOne({
            where: { id },
            relations: {
                user: true,
                category: true,
            },
        })
    }

    async update(id: number, updateTransactionDto: UpdateTransactionDto) {
        const isExist = await this.transactionRepository.findOne({
            where: { id },
        })
        if (!isExist) {
            throw new NotAcceptableException('Transaction not found')
        }
        return await this.transactionRepository.update(id, updateTransactionDto)
    }

    async remove(id: number) {
        return `This action removes a #${id} transaction`
    }
}
