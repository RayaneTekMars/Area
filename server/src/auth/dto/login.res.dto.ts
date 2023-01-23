import { ApiProperty } from '@nestjs/swagger'
import { AccountDto } from '../../accounts/dto/account.dto'

class LoginDataResDto {

    @ApiProperty({
        type: AccountDto
    })
    account: AccountDto

    @ApiProperty()
    bearerToken: string

}

class LoginResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty({
        type: LoginDataResDto
    })
    data: LoginDataResDto

}

export {
    LoginResDto
}
