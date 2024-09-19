import { CanActivate, ExecutionContext } from '@nestjs/common'

export class AuthorGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const { id, type } = req.params

        switch (type) {
            case 'transactions':
            case 'category':
            default:
                throw new Error('Wrong type')
        }
        return true
    }
}
