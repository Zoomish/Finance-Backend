import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as argon2 from 'argon2'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    async create(createUserDto: CreateUserDto) {
        const exist = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        })
        if (exist) {
            throw new BadRequestException('User already exists')
        }
        return await this.userRepository.create({
            email: createUserDto.email,
            password: await argon2.hash(createUserDto.password),
        })
    }

    findOne() {
        return `This action returns all user`
    }
}
