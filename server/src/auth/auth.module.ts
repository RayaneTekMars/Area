import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GoogleCredentials } from './entities/google-credentials.entity'
import { LocalCredentials } from './entities/local-credentials.entity'
import { GoogleApiService } from './services/google-api.service'
import { LocalCredentialsService } from './services/local-credentials.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { Account } from '../about/accounts/entities/account.entity'
import { TokenModule } from '../token/token.module'
import { AuthToken } from '../token/entities/auth-token.entity'
import { AccountsModule } from '../about/accounts/accounts.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([Account, AuthToken, GoogleCredentials, LocalCredentials]),
        PassportModule,
        AccountsModule,
        TokenModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        GoogleApiService,
        LocalCredentialsService,
        JwtStrategy,
        LocalStrategy
    ]
})
class AuthModule {}

export {
    AuthModule
}
