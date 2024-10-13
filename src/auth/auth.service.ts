import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { IUser } from 'src/types/types'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email)
        const isValid = user && (await argon2.verify(user.password, pass))
        return isValid ? user : null
    }

    async login(user: IUser) {
        const { id, email } = user
        return { user, token: this.jwtService.sign({ id, email }) }
    }
}
