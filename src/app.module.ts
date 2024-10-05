import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { TransactionModule } from './transaction/transaction.module'
import { UserModule } from './user/user.module'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs')

@Module({
    imports: [
        UserModule,
        CategoryModule,
        AuthModule,
        TransactionModule,
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                ssl: {
                    rejectUnauthorized: true,
                    ca: fs.readFileSync('./ca.pem').toString(),
                },
                autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AppModule {}
