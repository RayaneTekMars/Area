import { ApiProperty } from '@nestjs/swagger'
import { AuthTokenDto } from './auth-token.dto'

class AuthTokensDataDto {

    @ApiProperty({
        type: [AuthTokenDto]
    })
    authTokens: AuthTokenDto[]

}

class GetAuthTokensResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty({
        type: AuthTokensDataDto
    })
    data: AuthTokensDataDto

}

export {
    GetAuthTokensResDto
}
