import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    app.enableCors()
    app.getHttpServer()
    await app.listen(process.env.PORT, () =>
        console.log(`Server started on port ${location.port}`)
    )
}
bootstrap()
