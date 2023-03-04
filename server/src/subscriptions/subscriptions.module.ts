import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubscriptionsController } from './subscriptions.controller'
import { Subscription } from './entities/subscription.entity'
import { SubscriptionsService } from './subscriptions.service'
import { TwitterSubscribeService } from './services/twitter.sub.service'
import { GithubSubscribeService } from './services/github.sub.service'
import { DiscordSubscribeService } from './services/discord.sub.service'
import { SpotifySubscribeService } from './services/spotify.sub.service'
import { TwitchSubscribeService } from './services/twitch.sub.service'
import { Account } from '../accounts/entities/account.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Subscription, Account])],
    controllers: [SubscriptionsController],
    providers: [
        SubscriptionsService,
        TwitterSubscribeService,
        GithubSubscribeService,
        DiscordSubscribeService,
        SpotifySubscribeService,
        TwitchSubscribeService
    ],
    exports: [
        SubscriptionsService,
        TwitterSubscribeService,
        GithubSubscribeService,
        DiscordSubscribeService,
        SpotifySubscribeService,
        TwitchSubscribeService
    ]
})
export class SubscriptionsModule {}
