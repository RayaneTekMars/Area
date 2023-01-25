import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length, MaxLength } from 'class-validator'

class LocalLoginReqDto {

    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @Length(6, 128)
    password: string

    @ApiProperty()
    @IsString()
    @MaxLength(128)
    authTokenName: string

}

export {
    LocalLoginReqDto
}
