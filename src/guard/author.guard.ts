import { CanActivate, ExecutionContext } from '@nestjs/common'
import { CategoryService } from 'src/category/category.service'
import { TransactionService } from 'src/transaction/transaction.service'

export class AuthorGuard implements CanActivate {
    constructor(
        private readonly transactionService: TransactionService,
        private readonly categoryService: CategoryService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const { id, type } = req.params

        switch (type) {
            case 'transaction':
            case 'category':
            default:
                throw new Error('Wrong type')
        }
        return true
    }
}
