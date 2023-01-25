import { ApiProperty } from '@nestjs/swagger'
import { EntityType } from '../../common/enums/entity-type.enum'

class AuthTokenDto {

    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    lastActive: string

    @ApiProperty()
    expiresAt: string

    @ApiProperty()
    updatedAt: string

    @ApiProperty()
    createdAt: string

    @ApiProperty()
    type: EntityType

}

export {
    AuthTokenDto
}
