import { Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email)
        if (user && user.password === pass) {
            const { password, ...result } = user
            return result
        }
        return null
    }
}
