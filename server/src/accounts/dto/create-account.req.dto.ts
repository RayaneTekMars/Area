import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

class CreateAccountReqDto {

    @ApiProperty()
    @IsString()
    @Length(2, 32)
    username: string

}

export {
    CreateAccountReqDto
}
