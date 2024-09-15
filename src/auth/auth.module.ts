import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserService } from 'src/user/user.service'

@Module({
    imports: [UserService],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
