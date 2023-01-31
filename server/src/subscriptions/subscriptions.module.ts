import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Account } from '../accounts/entities/account.entity';
import { SubscriptionsService } from './subscriptions.service';
import { TwitterSubscribeService } from './services/twitter.sub.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, Account])],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, TwitterSubscribeService],
  exports: [SubscriptionsService, TwitterSubscribeService]
})
export class SubscriptionsModule { }
