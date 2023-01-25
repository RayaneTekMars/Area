import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AboutModule } from './about/about.module'
import { AccountsModule } from './accounts/accounts.module'
import { AuthModule } from './auth/auth.module'
import { TokenModule } from './token/token.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [
                `.env.${process.env.NODE_ENV ?? ''}.local`,
                '.env.local',
                `.env.${process.env.NODE_ENV ?? ''}`,
                '.env'
            ],
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('POSTGRES_HOST'),
                port: configService.get<number>('POSTGRES_PORT'),
                username: configService.get<string>('POSTGRES_USER'),
                password: configService.get<string>('POSTGRES_PASSWORD'),
                database: configService.get<string>('POSTGRES_DB'),
                entities: [`${__dirname}/**/entities/*.entity.{js,ts}`],
                synchronize: true,
                autoLoadEntities: true,
                migrations: [`${__dirname}/database/migrations/*.ts`],
            }),
            inject: [ConfigService]
        }),
        AccountsModule,
        AuthModule,
        TokenModule,
        AboutModule
    ],
    providers: [
        {
            provide: APP_PIPE,
            useFactory: () => new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true
            })
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor
        }
    ]
})
class AppModule {}

export {
    AppModule
}
