import { ApiProperty } from '@nestjs/swagger'
import { AccountDto } from './account.dto'

class GetAccountResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty({
        type: AccountDto
    })
    data: AccountDto

}

export {
    GetAccountResDto
}
