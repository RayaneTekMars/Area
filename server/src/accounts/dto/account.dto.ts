import { ApiProperty } from '@nestjs/swagger'
import { EntityType } from '../../common/enums/entity-type.enum'

class AccountDto {

    @ApiProperty()
    id: string

    @ApiProperty()
    username: string

    @ApiProperty()
    updatedAt: string

    @ApiProperty()
    createdAt: string

    @ApiProperty()
    type: EntityType

}

export {
    AccountDto
}
