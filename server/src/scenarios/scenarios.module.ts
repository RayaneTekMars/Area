import { Module } from '@nestjs/common';
import { ScenariosController } from './scenarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scenario } from './entities/scenario.entity';
import { Account } from '../accounts/entities/account.entity';
import { ScenariosService } from './scenarios.service';
import { TwitterService } from './services/twitter.service';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { TwitterSchedule } from './schedules/twitter.schedule';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([Scenario, Account]), SubscriptionsModule],
  controllers: [ScenariosController],
  providers: [ScenariosService, TwitterService, TwitterSchedule],
  exports: [ScenariosService]
})
export class ScenariosModule { }
