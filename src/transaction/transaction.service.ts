import { Injectable, NotFoundException } from '@nestjs/common'
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
        return await this.transactionRepository.save({
            ...createTransactionDto,
            user: { id },
        })
    }

    async findAll(id) {
        return await this.transactionRepository.find({
            where: {
                user: { id },
            },
            order: {
                createdAt: 'DESC',
            },
        })
    }

    async findAllByType(id, type) {
        const transactions = await this.transactionRepository.find({
            where: {
                user: { id },
                type,
            },
            order: {
                createdAt: 'DESC',
            },
        })
        transactions.reduce(()=> ,0)
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
            throw new NotFoundException('Transaction not found')
        }
        return await this.transactionRepository.update(id, updateTransactionDto)
    }

    async remove(id: number) {
        const transaction = await this.transactionRepository.findOne({
            where: { id },
        })
        if (!transaction) {
            throw new NotFoundException('Transaction not found')
        }
        return await this.transactionRepository.delete(id)
    }

    async getAllWithPagination(id: number, page: number, limit: number) {
        return await this.transactionRepository.find({
            where: {
                user: { id },
            },
            relations: {
                user: true,
                category: true,
            },
            order: {
                createdAt: 'DESC',
            },
            skip: (page - 1) * limit,
            take: limit,
        })
    }
}
