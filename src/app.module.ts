import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { TransactionModule } from './transaction/transaction.module'
import { UserModule } from './user/user.module'

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
                url: configService.get('DB_URL'),
                driver: configService.get('DB_DRIVER'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                ssl: true,
                autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
