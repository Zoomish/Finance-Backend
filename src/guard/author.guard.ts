import { CanActivate } from '@nestjs/common'

export class AuthorGuard implements CanActivate {
    async canActivate() {
        return true
    }
}
