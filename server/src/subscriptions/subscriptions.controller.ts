import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Account } from '../accounts/entities/account.entity';
import { GetSubscriptionsResDto, SubscriptionResDto, SubscriptionUrlResDto } from './dto/subscriptions.res.dto';
import { SubscriptionReqDto } from './dto/subscriptions.req.dto';
import { SubscriptionsService } from './subscriptions.service';
import { TwitterSubscribeService } from './services/twitter.sub.service';

@Controller('subscriptions')
@ApiTags('Subscriptions')
@ApiBearerAuth()
export class SubscriptionsController {

    constructor(
        public readonly subscriptionsService: SubscriptionsService,
        public readonly twitterSubscribeService: TwitterSubscribeService,
    ) { }

    @Get('')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get all subscriptions from the current user' })
    @ApiOkResponse({ type: GetSubscriptionsResDto })
    @ApiBadRequestResponse()
    async getSubscriptions(@CurrentUser() user: Account): Promise<GetSubscriptionsResDto> {
        const subscriptions = await this.subscriptionsService.getSubscriptions(user.id);
        return {
            status: 'success',
            data: subscriptions
        };
    }

    @Get('twitter')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get an AuthLink for Twitter' })
    @ApiOkResponse({ type: SubscriptionUrlResDto })
    @ApiBadRequestResponse()
    async getTwitterSubscription(@CurrentUser() user: Account): Promise<SubscriptionUrlResDto> {
        const url = await this.twitterSubscribeService.getAuthorizeUrl(user.id);

        return {
            status: 'success',
            data: {
                url,
            }
        };
    }

    @Post('twitter')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Create a subscription to Twitter' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async createTwitterSubscription(@CurrentUser() user: Account, @Body() body: SubscriptionReqDto): Promise<SubscriptionResDto> {
        const { accessToken, refreshToken, expiresIn } = await this.twitterSubscribeService.authorize(user.id, body.code);
        const subscription = await this.subscriptionsService.createSubscription('Twitter', user, accessToken, refreshToken!, expiresIn);

        return {
            status: 'success',
            data: {
                id: subscription.id,
            }
        };
    }

    @Put('twitter')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Update a subscription from the current user' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async updateTwitterSubscription(@CurrentUser() user: Account): Promise<SubscriptionResDto> {
        const subscription = await this.subscriptionsService.getSubscription('Twitter', user.id);

        if (!subscription) {
            throw new Error('Subscription not found');
        }

        const { accessToken, refreshToken, expiresIn } = await this.twitterSubscribeService.refreshAccessToken(subscription.refreshToken!);
        await this.subscriptionsService.updateSubscription('Twitter', user.id, accessToken, refreshToken!, expiresIn);

        return {
            status: 'success',
            data: {
                id: subscription.id,
            }
        };
    }

    @Delete('twitter')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Delete a subscription from the current user' })
    @ApiOkResponse({ type: SubscriptionResDto })
    @ApiBadRequestResponse()
    async deleteTwitterSubscription(@CurrentUser() user: Account): Promise<SubscriptionResDto> {
        const subscription = await this.subscriptionsService.deleteSubscription('Twitter', user.id);

        if (!subscription) {
            throw new Error('Subscription not found');
        }

        this.twitterSubscribeService.revokeAccessToken(subscription.refreshToken!);

        return {
            status: 'success',
            data: {
                id: subscription.id,
            }
        };
    }

}