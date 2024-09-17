import { Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { IUser } from 'src/types/types'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email)
        const isValid = user && (await argon2.verify(user.password, pass))
        return isValid ? user : null
    }

    async login(user: IUser) {
        const { id, email } = user
        return {
            access_token: this.jwtService.sign({ id, email }),
        }
    }
}
