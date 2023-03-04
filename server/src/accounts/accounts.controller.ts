import {
    Controller,
    Get,
    SerializeOptions,
    UseGuards
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { AccountsService } from './accounts.service'
import { Account } from './entities/account.entity'
import { GetAccountResDto } from './dto/get-account.res.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'

@Controller('/')
@ApiTags('Accounts')
@ApiBearerAuth()
class AccountsController {

    constructor(
        private readonly accountsService: AccountsService
    ) {}

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    @SerializeOptions({ groups: ['owner'] })
    @ApiOperation({ summary: 'Get detailed profile information about the current user' })
    @ApiOkResponse({ type: GetAccountResDto })
    @ApiUnauthorizedResponse()
    async getCurrentUserProfile(@CurrentUser() user: Account): Promise<GetAccountResDto> {

        // Load relations
        const account = await this.accountsService.findById(user.id)

        return {
            status: 'success',
            data: account
        }
    }
}

export {
    AccountsController
}
