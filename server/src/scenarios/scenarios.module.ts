import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { ScenariosController } from './scenarios.controller'
import { Scenario } from './entities/scenario.entity'
import { ScenariosService } from './scenarios.service'
import { TwitterService } from './services/twitter.service'
import { TwitterSchedule } from './schedules/twitter.schedule'
import { GithubService } from './services/github.service'
import { GithubSchedule } from './schedules/github.schedule'
import { Account } from '../accounts/entities/account.entity'
import { SubscriptionsModule } from '../subscriptions/subscriptions.module'

@Module({
    imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([Scenario, Account]), SubscriptionsModule],
    controllers: [ScenariosController],
    providers: [
        ScenariosService,
        TwitterService,
        TwitterSchedule,
        GithubService,
        GithubSchedule
    ],
    exports: [ScenariosService]
})
export class ScenariosModule {}
