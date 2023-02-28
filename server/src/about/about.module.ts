import { Module } from '@nestjs/common'
import { AboutController } from './about.controller'
import { ServicesModule } from '../services/services.module'

@Module({
    imports: [ServicesModule],
    controllers: [AboutController]
})
export class AboutModule {}
