import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScenariosController } from './scenarios.controller'
import { Scenario } from './entities/scenario.entity'
import { ScenariosService } from './scenarios.service'
import { Account } from '../about/accounts/entities/account.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Scenario, Account])],
    controllers: [ScenariosController],
    providers: [ScenariosService],
    exports: [ScenariosService]
})
export class ScenariosModule {}
