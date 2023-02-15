import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TokenController } from './token.controller'
import { TokenService } from './token.service'
import { AuthToken } from './entities/auth-token.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([AuthToken]),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET') ?? 'secret',
                signOptions: {
                    expiresIn: configService.get<string>('JWT_OPTION_EXPIRES_IN')
                }
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [TokenController],
    providers: [TokenService],
    exports: [TokenService]
})
class TokenModule {}

export {
    TokenModule
}
