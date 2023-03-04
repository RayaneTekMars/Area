import { Controller, Delete, Get, HttpCode, Param, UseGuards } from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { TokenService } from './token.service'
import { GetAuthTokensResDto } from './dto/get-auth-tokens.res.dto'
import { Account } from '../about/accounts/entities/account.entity'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'

@Controller('/')
@ApiTags('Tokens')
@ApiBearerAuth()
class TokenController {

    constructor(
        private readonly tokenService: TokenService
    ) {}

    @Get('/me/tokens')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get auth tokens of the current user' })
    @ApiOkResponse({ type: GetAuthTokensResDto })
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    async getAllAuthTokens(@CurrentUser() user: Account): Promise<GetAuthTokensResDto> {

        const authTokens = await this.tokenService.getAllAuthTokensForAccount(user)

        return {
            status: 'success',
            data: {
                authTokens
            }
        }
    }

    @Delete('/token/:tokenId')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete an auth token' })
    @ApiNoContentResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    deleteAuthToken(@CurrentUser() user: Account, @Param('tokenId') tokenId: string): Promise<void> {
        return this.tokenService.deleteAuthToken(tokenId, user)
    }

}

export {
    TokenController
}
