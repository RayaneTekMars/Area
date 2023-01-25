import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'

class LoginWithGoogleCodeReqDto {

    @ApiProperty()
    @IsString()
    code: string

    @ApiProperty()
    @IsString()
    @MaxLength(128)
    authTokenName: string

}

export {
    LoginWithGoogleCodeReqDto
}
