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

        let entity
        switch (type) {
            case 'transaction':
                entity = await this.transactionService.findOne(+id)
                break
            case 'category':
                entity = await this.categoryService.findOne(+id)
                break
            default:
                throw new Error('Wrong type')
        }
        const user = req.user
        if (entity && entity.user.id === user.id) {
            return true
        }
        return false
    }
}
