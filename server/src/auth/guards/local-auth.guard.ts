import { AuthGuard } from '@nestjs/passport'

class LocalAuthGuard extends AuthGuard('local') {}

export {
    LocalAuthGuard
}
