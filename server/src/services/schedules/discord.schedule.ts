/* eslint-disable max-depth, no-console */
import { Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { DiscordService } from '../services/discord.service'
import { ScenariosService } from '../../scenarios/scenarios.service'
import { SubscriptionsService } from '../../subscriptions/subscriptions.service'
import { ServiceName } from '../../common/types/service.type'
import { DiscordSubscribeService } from '../../subscriptions/services/discord.sub.service'

@Injectable()
export class DiscordSchedule {

    constructor(
        private readonly discordService: DiscordService,
        private readonly scenariosService: ScenariosService,
        private readonly subscriptionsService: SubscriptionsService,
        private readonly discordSubscribeService: DiscordSubscribeService
    ) {}

    @Interval(5000)
    async handleNewMessages() {
        console.log('Discord: Checking for new messages...')
        const subs = await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Discord)
        console.log(`Discord: Found ${subs.length} subscriptions`)
        for await (const sub of subs) {
            const scenarios = await this.scenariosService.getScenariosByTrigger(sub.account.id, ServiceName.Discord, 'NewMessage')
            console.log(`Discord: Found ${scenarios.length} scenarios for the user "${sub.account.username}"`)
            for await (const scenario of scenarios) {
                const messages = await this.discordService.getNewMessages(sub.account.id, scenario)
                console.log(`Discord: Found ${messages.length} new messages:`)
                console.log(messages)
                for (const message of messages)
                    void this.discordService.triggerNewMessage(sub.account.id, scenario, message)
            }
        }
    }

    @Interval(3_600_000)
    async refreshDiscordTokens() {
        console.log('Discord: Refreshing Discord tokens...')
        const subs = await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Discord)
        console.log(`Discord: Found ${subs.length} subscriptions`)
        for await (const sub of subs) {
            try {
                const { accessToken } = await this.discordSubscribeService.refreshAccessToken(sub.refreshToken)
                void this.subscriptionsService.updateSubscription(ServiceName.Discord, sub.account.id, accessToken, sub.refreshToken, sub.expiresAt)
            } catch (error) {
                console.error(error)
                throw new Error('Error refreshing access token')
            }
        }
    }
}
