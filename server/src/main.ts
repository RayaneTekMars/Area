import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'

const bootstrap = async () => {

    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)
    const httpAdapterHost = app.get(HttpAdapterHost)

    const logger = new Logger('Bootstrap')
    const documentConfig = new DocumentBuilder()
        .setTitle('AutoMateMe')
        .setDescription('The API that runs the AutoMateMe platform')
        .setVersion('1.0')
        .addBearerAuth()
        .build()

    app.enableCors()
    app.useGlobalFilters(
        new AllExceptionsFilter(httpAdapterHost),
        new HttpExceptionFilter(httpAdapterHost)
    )

    const appPort = configService.get<number>('APP_PORT') ?? 8080
    const environment = configService.get<string>('NODE_ENV')

    if (environment === undefined) {
        logger.error('The environment (NODE_ENV) is not defined')
        return app.close()
    }

    console.log(configService.get<string>('IS_SWAGGER_DOC_VISIBLE'))

    if (configService.get<string>('IS_SWAGGER_DOC_VISIBLE') === 'true') {
        const swaggerDocument = SwaggerModule.createDocument(app, documentConfig)
        SwaggerModule.setup('/swagger', app, swaggerDocument)
    }

    await app.listen(appPort)
    logger.log(`[ENV=${environment}] Application running on port ${appPort}`)
}

void bootstrap()
