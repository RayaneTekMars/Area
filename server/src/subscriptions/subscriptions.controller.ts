import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags, ApiBadRequestResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger'
import { GetSubscriptionsResDto, SubscriptionResDto, SubscriptionUrlResDto } from './dto/subscriptions.res.dto'
import { SubscriptionReqDto } from './dto/subscriptions.req.dto'
import { SubscriptionsService } from './subscriptions.service'
import { TwitterSubscribeService } from './services/twitter.sub.service'
import { GithubSubscribeService } from './services/github.sub.service'
import { DiscordSubscribeService } from './services/discord.sub.service'
import { SpotifySubscribeService } from './services/spotify.sub.service'
import { TwitchSubscribeService } from './services/twitch.sub.service'
import { Account } from '../accounts/entities/account.entity'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { ServiceName } from '../common/types/service.type'
import type Subscribe from './services/subscribe'

@Controller('subscriptions')
@ApiTags('Subscriptions')
@ApiBearerAuth()
export class SubscriptionsController {

    private readonly subscribeServices: Map<ServiceName, Subscribe>

    constructor(
        private readonly subscriptionsService: SubscriptionsService,
        private readonly twitterSubscribeService: TwitterSubscribeService,
        private readonly githubSubscribeService: GithubSubscribeService,
        private readonly discordSubscribeService: DiscordSubscribeService,
        private readonly spotifySubscribeService: SpotifySubscribeService,
        private readonly twitchSubscribeService: TwitchSubscribeService
    ) {
        this.subscribeServices = new Map<ServiceName, Subscribe>([
            [ServiceName.Twitter, twitterSubscribeService],
            [ServiceName.Github, githubSubscribeService],
            [ServiceName.Discord, discordSubscribeService],
            [ServiceName.Spotify, spotifySubscribeService],
            [ServiceName.Twitch, twitchSubscribeService]
        ])
    }

    @Get('')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get all subscriptions from the current user' })
    @ApiOkResponse({ type: GetSubscriptionsResDto })
    @ApiBadRequestResponse()
    async getSubscriptions(@CurrentUser() user: Account): Promise<GetSubscriptionsResDto> {
        const subscriptions = await this.subscriptionsService.getSubscriptions(user.id)

        return {
            status: 'success',
            data: subscriptions.map(subscription => ({
                id: subscription.id,
                serviceName: subscription.serviceName,
                expiresAt: subscription.expiresAt
            }))
        }
    }

    @Get(':serviceName')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiParam({ name: 'serviceName', enum: Object.values(ServiceName) })
    @ApiOperation({ summary: 'Get an AuthLink for the serviceName' })
    @ApiOkResponse({ type: SubscriptionUrlResDto })
    @ApiBadRequestResponse()
    getSubscription(@CurrentUser() user: Account, @Param('serviceName') serviceName: ServiceName): SubscriptionUrlResDto {
        try {
            const subscribeService = this.subscribeServices.get(serviceName)
            if (!subscribeService)
                throw new Error('Service not found')

            const url = subscribeService.getAuthorizeUrl(user.id)

            return {
                status: 'success',
                data: {
                    url
                }
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
            throw new Error(`Couldn't get the ${serviceName} AuthLink`)
        }
    }

    @Post(':serviceName')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiParam({ name: 'serviceName', enum: Object.values(ServiceName) })
    @ApiOperation({ summary: 'Create a subscription to the serviceName' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async createSubscription(@CurrentUser() user: Account, @Param('serviceName') serviceName: ServiceName, @Body() body: SubscriptionReqDto): Promise<SubscriptionResDto> {
        try {
            const subscribeService = this.subscribeServices.get(serviceName)
            if (!subscribeService)
                throw new Error('Service not found')

            const { accessToken, refreshToken, expiresAt } = await subscribeService.authorize(body.code, user.id)
            const subscription = await this.subscriptionsService.createSubscription(serviceName, user, accessToken, refreshToken, expiresAt)

            return {
                status: 'success',
                data: {
                    id: subscription.id
                }
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
            throw new Error(`Couldn't create the ${serviceName} subscription`)
        }
    }

    @Put(':serviceName')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiParam({ name: 'serviceName', enum: Object.values(ServiceName) })
    @ApiOperation({ summary: 'Update a subscription to the serviceName' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async updateSubscription(@CurrentUser() user: Account, @Param('serviceName') serviceName: ServiceName): Promise<SubscriptionResDto> {
        try {
            const subscribeService = this.subscribeServices.get(serviceName)
            if (!subscribeService)
                throw new Error('Service not found')

            const subscription = await this.subscriptionsService.getSubscription(serviceName, user.id)
            if (!subscription)
                throw new Error('Subscription not found')

            const { accessToken, newRefreshToken, expiresAt } = await subscribeService.refreshAccessToken(subscription.refreshToken, subscription.accessToken)
            await this.subscriptionsService.updateSubscription(serviceName, user.id, accessToken, newRefreshToken, expiresAt)

            return {
                status: 'success',
                data: {
                    id: subscription.id
                }
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
            throw new Error(`Couldn't update the ${serviceName} subscription`)
        }
    }

    @Delete(':serviceName')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiParam({ name: 'serviceName', enum: Object.values(ServiceName) })
    @ApiOperation({ summary: 'Delete a subscription to the serviceName' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async deleteSubscription(@CurrentUser() user: Account, @Param('serviceName') serviceName: ServiceName): Promise<SubscriptionResDto> {
        try {
            const subscribeService = this.subscribeServices.get(serviceName)
            if (!subscribeService)
                throw new Error('Service not found')

            const subscription = await this.subscriptionsService.deleteSubscription(serviceName, user.id)
            if (!subscription)
                throw new Error('Subscription not found')

            await subscribeService.revokeAccessToken(subscription.refreshToken, subscription.accessToken)

            return {
                status: 'success',
                data: {
                    id: subscription.id
                }
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
            throw new Error(`Couldn't delete the ${serviceName} subscription`)
        }
    }

}
