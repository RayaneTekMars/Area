import { IntersectionType } from '@nestjs/swagger'
import { LocalLoginReqDto } from './local-login.req.dto'
import { CreateAccountReqDto } from '../../accounts/dto/create-account.req.dto'

class SignupReqDto extends IntersectionType(LocalLoginReqDto, CreateAccountReqDto) {}

export {
    SignupReqDto
}
