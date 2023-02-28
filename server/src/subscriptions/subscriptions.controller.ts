import { Body, Controller, Delete, Get, HttpCode, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags, ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger'
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
import { ServiceName } from '../scenarios/types/service.type'

@Controller('subscriptions')
@ApiTags('Subscriptions')
@ApiBearerAuth()
export class SubscriptionsController {

    constructor(
        public readonly subscriptionsService: SubscriptionsService,
        public readonly twitterSubscribeService: TwitterSubscribeService,
        public readonly githubSubscribeService: GithubSubscribeService,
        public readonly discordSubscribeService: DiscordSubscribeService,
        public readonly spotifySubscribeService: SpotifySubscribeService,
        public readonly twitchSubscribeService: TwitchSubscribeService
    ) {}

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
            data: subscriptions
        }
    }

    @Get('twitter')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get an AuthLink for Twitter' })
    @ApiOkResponse({ type: SubscriptionUrlResDto })
    @ApiBadRequestResponse()
    getTwitterSubscription(@CurrentUser() user: Account): SubscriptionUrlResDto {
        const url = this.twitterSubscribeService.getAuthorizeUrl(user.id)

        return {
            status: 'success',
            data: {
                url
            }
        }
    }

    @Post('twitter')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Create a subscription to Twitter' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async createTwitterSubscription(@CurrentUser() user: Account, @Body() body: SubscriptionReqDto): Promise<SubscriptionResDto> {
        const { accessToken, refreshToken, expiresIn } = await this.twitterSubscribeService.authorize(user.id, body.code)
        const subscription = await this.subscriptionsService.createSubscription(ServiceName.Twitter, user, accessToken, refreshToken, expiresIn)

        return {
            status: 'success',
            data: {
                id: subscription.id
            }
        }
    }

    @Put('twitter')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Update a subscription from the current user' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async updateTwitterSubscription(@CurrentUser() user: Account): Promise<SubscriptionResDto> {
        const subscription = await this.subscriptionsService.getSubscription(ServiceName.Twitter, user.id)

        if (!subscription)
            throw new Error('Subscription not found')


        const { accessToken, refreshToken, expiresIn } = await this.twitterSubscribeService.refreshAccessToken(subscription.refreshToken)
        await this.subscriptionsService.updateSubscription(ServiceName.Twitter, user.id, accessToken, refreshToken, expiresIn)

        return {
            status: 'success',
            data: {
                id: subscription.id
            }
        }
    }

    @Delete('twitter')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Delete a subscription from the current user' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async deleteTwitterSubscription(@CurrentUser() user: Account): Promise<SubscriptionResDto> {
        const subscription = await this.subscriptionsService.deleteSubscription(ServiceName.Twitter, user.id)

        if (!subscription)
            throw new Error('Subscription not found')


        void this.twitterSubscribeService.revokeAccessToken(subscription.refreshToken)

        return {
            status: 'success',
            data: {
                id: subscription.id
            }
        }
    }

    @Get('github')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get an AuthLink for Github' })
    @ApiOkResponse({ type: SubscriptionUrlResDto })
    @ApiBadRequestResponse()
    getGithubSubscription(): SubscriptionUrlResDto {
        const url = this.githubSubscribeService.getAuthorizeUrl()

        return {
            status: 'success',
            data: {
                url
            }
        }
    }

    @Post('github')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Create a subscription to Github' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async createGithubSubscription(@CurrentUser() user: Account, @Body() body: SubscriptionReqDto): Promise<SubscriptionResDto> {
        const { accessToken } = await this.githubSubscribeService.authorize(body.code)
        const subscription = await this.subscriptionsService.createSubscription(ServiceName.Github, user, accessToken, '', 0)

        return {
            status: 'success',
            data: {
                id: subscription.id
            }
        }
    }

    @Put('github')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Update a subscription from the current user' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async updateGithubSubscription(@CurrentUser() user: Account): Promise<SubscriptionResDto> {
        const subscription = await this.subscriptionsService.getSubscription(ServiceName.Github, user.id)

        if (!subscription)
            throw new Error('Subscription not found')

        const { accessToken } = await this.githubSubscribeService.refreshAccessToken(subscription.accessToken)
        await this.subscriptionsService.updateSubscription(ServiceName.Github, user.id, accessToken, '', 0)

        return {
            status: 'success',
            data: {
                id: subscription.id
            }
        }
    }

    @Delete('github')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Delete a subscription from the current user' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async deleteGithubSubscription(@CurrentUser() user: Account): Promise<SubscriptionResDto> {
        const subscription = await this.subscriptionsService.deleteSubscription(ServiceName.Github, user.id)

        if (!subscription)
            throw new Error('Subscription not found')

        void this.githubSubscribeService.revokeAccessToken(subscription.accessToken)

        return {
            status: 'success',
            data: {
                id: subscription.id
            }
        }
    }

    @Get('discord')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get an AuthLink for Discord' })
    @ApiOkResponse({ type: SubscriptionUrlResDto })
    @ApiBadRequestResponse()
    getDiscordSubscription(): SubscriptionUrlResDto {
        const url = this.discordSubscribeService.getAuthorizeUrl()

        return {
            status: 'success',
            data: {
                url
            }
        }
    }

    @Post('discord')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Create a subscription to Discord' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async createDiscordSubscription(@CurrentUser() user: Account, @Body() body: SubscriptionReqDto): Promise<SubscriptionResDto> {
        const { accessToken, refreshToken } = await this.discordSubscribeService.authorize(body.code)
        const subscription = await this.subscriptionsService.createSubscription(ServiceName.Discord, user, accessToken, refreshToken, 10_000)

        return {
            status: 'success',
            data: {
                id: subscription.id
            }
        }
    }

    @Put('discord')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Update a subscription from the current user' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async updateDiscordSubscription(@CurrentUser() user: Account): Promise<SubscriptionResDto> {
        const subscription = await this.subscriptionsService.getSubscription(ServiceName.Discord, user.id)

        if (!subscription)
            throw new Error('Subscription not found')

        const { accessToken, newRefreshToken, expiresIn } = await this.discordSubscribeService.refreshAccessToken(subscription.refreshToken)
        await this.subscriptionsService.updateSubscription(ServiceName.Github, user.id, accessToken, newRefreshToken, expiresIn)

        return {
            status: 'success',
            data: {
                id: subscription.id
            }
        }
    }

    @Delete('discord')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Delete a subscription from the current user' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async deleteDiscordSubscription(@CurrentUser() user: Account): Promise<SubscriptionResDto> {
        const subscription = await this.subscriptionsService.deleteSubscription(ServiceName.Discord, user.id)

        if (!subscription)
            throw new Error('Subscription not found')

        return {
            status: 'success',
            data: {
                id: subscription.id
            }
        }
    }

    @Get('spotify')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get an AuthLink for Spotify' })
    @ApiOkResponse({ type: SubscriptionUrlResDto })
    @ApiBadRequestResponse()
    getSpotifySubscription(): SubscriptionUrlResDto {
        const url = this.spotifySubscribeService.getAuthorizeUrl()

        return {
            status: 'success',
            data: {
                url
            }
        }
    }

    @Post('spotify')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Create a subscription to Spotify' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async createSpotifySubscription(@CurrentUser() user: Account, @Body() body: SubscriptionReqDto): Promise<SubscriptionResDto> {
        const { accessToken, refreshToken } = await this.spotifySubscribeService.authorize(body.code)
        const subscription = await this.subscriptionsService.createSubscription(ServiceName.Spotify, user, accessToken, refreshToken, 10_000)

        return {
            status: 'success',
            data: {
                id: subscription.id
            }
        }
    }

    @Put('spotify')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Update a subscription from the current user' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async updateSpotifySubscription(@CurrentUser() user: Account): Promise<SubscriptionResDto> {
        const subscription = await this.subscriptionsService.getSubscription(ServiceName.Spotify, user.id)

        if (!subscription)
            throw new Error('Subscription not found')

        const { accessToken, newRefreshToken, expiresIn } = await this.spotifySubscribeService.refreshAccessToken(subscription.refreshToken)
        await this.subscriptionsService.updateSubscription(ServiceName.Spotify, user.id, accessToken, newRefreshToken, expiresIn)

        return {
            status: 'success',
            data: {
                id: subscription.id
            }
        }
    }

    @Delete('spotify')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Delete a subscription from the current user' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async deleteSpotifySubscription(@CurrentUser() user: Account): Promise<SubscriptionResDto> {
        const subscription = await this.subscriptionsService.deleteSubscription(ServiceName.Spotify, user.id)

        if (!subscription)
            throw new Error('Subscription not found')

        return {
            status: 'success',
            data: {
                id: subscription.id
            }
        }
    }

    @Get('twitch')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get an AuthLink for Twitch' })
    @ApiOkResponse({ type: SubscriptionUrlResDto })
    @ApiBadRequestResponse()
    getTwitchSubscription(): SubscriptionUrlResDto {
        const url = this.twitchSubscribeService.getAuthorizeUrl()

        return {
            status: 'success',
            data: {
                url
            }
        }
    }

    @Post('twitch')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Create a subscription to Twitch' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async createTwitchSubscription(@CurrentUser() user: Account, @Body() body: SubscriptionReqDto): Promise<SubscriptionResDto> {
        const { accessToken, refreshToken } = await this.twitchSubscribeService.authorize(body.code)
        const subscription = await this.subscriptionsService.createSubscription(ServiceName.Twitch, user, accessToken, refreshToken, 10_000)

        return {
            status: 'success',
            data: {
                id: subscription.id
            }
        }
    }

    // @Put('twitch')
    // @UseGuards(JwtAuthGuard)
    // @HttpCode(200)
    // @ApiOperation({ summary: 'Update a subscription from the current user' })
    // @ApiOkResponse({ type: SubscriptionResDto })
    // @ApiBadRequestResponse()
    // async updateTwitchSubscription(@CurrentUser() user: Account): Promise<SubscriptionResDto> {
    //     const subscription = await this.subscriptionsService.getSubscription(ServiceName.Twitch, user.id)

    //     if (!subscription)
    //         throw new Error('Subscription not found')

    //     const { accessToken, newRefreshToken, expiresIn } = await this.twitchSubscribeService.refreshAccessToken(subscription.refreshToken)
    //     await this.subscriptionsService.updateSubscription(ServiceName.Twitch, user.id, accessToken, newRefreshToken, expiresIn)

    //     return {
    //         status: 'success',
    //         data: {
    //             id: subscription.id
    //         }
    //     }
    // }

}
