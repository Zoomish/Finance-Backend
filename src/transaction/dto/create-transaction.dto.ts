import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Category } from 'src/category/entities/category.entity'
import { User } from 'src/user/entities/user.entity'

export class CreateTransactionDto {
    @IsNotEmpty()
    title: string
    @IsNotEmpty()
    @IsNumber()
    amount: number

    @IsString()
    type: 'expense' | 'income'
    category: Category
    user: User
}
