import { Category } from 'src/category/entities/category.entity'

export class CreateTransactionDto {
    title: string
    amount: number
    type: 'expense' | 'income'
    category: Category
}
