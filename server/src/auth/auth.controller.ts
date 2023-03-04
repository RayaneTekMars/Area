import { Body, Controller, HttpCode, Post, SerializeOptions, UseGuards } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LocalLoginReqDto } from './dto/local-login.req.dto'
import { LoginResDto } from './dto/login.res.dto'
import { LoginWithGoogleCodeReqDto } from './dto/login-with-google-code.req.dto'
import { SignupReqDto } from './dto/signup.req.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { Account } from '../about/accounts/entities/account.entity'
import { TokenService } from '../token/token.service'

@Controller('/auth')
@ApiTags('Auth')
class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly tokenService: TokenService
    ) {}

    @Post('/signup')
    @HttpCode(200)
    @SerializeOptions({ groups: ['owner'] })
    @ApiOperation({ summary: 'Sign up a new account' })
    @ApiOkResponse({ type: LoginResDto })
    @ApiBadRequestResponse()
    async signup(@Body() body: SignupReqDto): Promise<LoginResDto> {

        const { authTokenName } = body
        const account = await this.authService.signupWithLocalCredentials(body)
        const { bearerToken } = await this.tokenService.create(authTokenName, account)

        return {
            status: 'success',
            data: {
                account,
                bearerToken
            }
        }
    }

    @Post('/login')
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @SerializeOptions({ groups: ['owner'] })
    @ApiOperation({ summary: 'Login with local credentials' })
    @ApiOkResponse({ type: LoginResDto })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    async login(@CurrentUser() user: Account, @Body() body: LocalLoginReqDto): Promise<LoginResDto> {

        const { authTokenName } = body
        const { bearerToken } = await this.tokenService.create(authTokenName, user)

        return {
            status: 'success',
            data: {
                account: user,
                bearerToken
            }
        }
    }

    @Post('/login/google/code')
    @HttpCode(200)
    @SerializeOptions({ groups: ['owner'] })
    @ApiOperation({ summary: 'Login with a Google code' })
    @ApiOkResponse({ type: LoginResDto })
    @ApiBadRequestResponse()
    async loginWithGoogleCode(@Body() body: LoginWithGoogleCodeReqDto): Promise<LoginResDto> {

        const { authTokenName, code } = body
        const account = await this.authService.loginWithGoogleCode(code)
        const { bearerToken } = await this.tokenService.create(authTokenName, account)

        return {
            status: 'success',
            data: {
                account,
                bearerToken
            }
        }
    }

}

export {
    AuthController
}
