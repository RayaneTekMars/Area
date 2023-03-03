import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { ServicesController } from './services.controller'
import { ServicesService } from './services.service'
import { TwitterService } from './services/twitter.service'
import { TwitterSchedule } from './schedules/twitter.schedule'
import { GithubService } from './services/github.service'
import { GithubSchedule } from './schedules/github.schedule'
import { DiscordService } from './services/discord.service'
// import { DiscordSchedule } from './schedules/discord.schedule'
import { SpotifyService } from './services/spotify.service'
import { SpotifySchedule } from './schedules/spotify.schedule'
import { ScenariosModule } from '../scenarios/scenarios.module'
import { SubscriptionsModule } from '../subscriptions/subscriptions.module'
// import { TwitchService } from './services/twitch.service'
// import { TwitchSchedule } from './schedules/twitch.schedule'

@Module({
  imports: [ScheduleModule.forRoot(), ScenariosModule, SubscriptionsModule],
  controllers: [ServicesController],
  providers: [
    ServicesService,
    TwitterService,
    TwitterSchedule,
    GithubService,
    GithubSchedule,
    DiscordService,
    // DiscordSchedule,
    SpotifyService,
    SpotifySchedule
    // TwitchService,
    // TwitchSchedule
  ],
  exports: [ServicesService]
})
export class ServicesModule {}
