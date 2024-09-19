import { CanActivate, ExecutionContext } from '@nestjs/common'

export class AuthorGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        return true
    }
}
