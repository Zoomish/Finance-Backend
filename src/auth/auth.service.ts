import { Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email)
        const isValid = user && (await argon2.verify(user.password, pass))
        return isValid ? user : null
    }
}
