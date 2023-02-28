import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags, ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger'
import { GetServicesResDto, GetServiceResDto, GetTriggersResDto, GetTriggerResDto, GetReactionsResDto, GetReactionResDto } from './dto/services.res.dto'
import { ServicesService } from './services.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

import { Service, ServiceName } from '../common/types/service.type'
import { TriggerDefinition } from '../common/types/trigger.type'
import { ReactionDefinition } from '../common/types/reaction.type'


@Controller('services')
@ApiTags('Services')
@ApiBearerAuth()
export class ServicesController {

    constructor(private readonly servicesService: ServicesService) {}

    @Get('')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get all services' })
    @ApiOkResponse({ type: GetServicesResDto })
    @ApiBadRequestResponse()
    getServices(): Service[] {
        return this.servicesService.getIntegrations().map((x) => x.getService())
    }

    @Get(':serviceName')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get a service' })
    @ApiOkResponse({ type: GetServiceResDto })
    @ApiBadRequestResponse()
    getService(@Param('serviceName') serviceName: ServiceName): Service {
        const service = this.servicesService.getIntegrationByName(serviceName)?.getService()
        if (!service)
            throw new Error('Service not found')
        return service
    }

    @Get(':serviceName/triggers')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get all triggers of a service' })
    @ApiOkResponse({ type: GetTriggersResDto })
    @ApiBadRequestResponse()
    getTriggers(@Param('serviceName') serviceName: ServiceName): TriggerDefinition[] {
        const service = this.servicesService.getIntegrationByName(serviceName)
        if (!service)
            throw new Error('Service not found')
        return service.getTriggers().map((x) => x.getTriggerDefinition())
    }

    @Get(':serviceName/triggers/:triggerName')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get a trigger of a service' })
    @ApiOkResponse({ type: GetTriggerResDto })
    @ApiBadRequestResponse()
    getTrigger(@Param('serviceName') serviceName: ServiceName, @Param('triggerName') triggerName: string): TriggerDefinition {
        const service = this.servicesService.getIntegrationByName(serviceName)
        if (!service)
            throw new Error('Service not found')
        const trigger = service.getTriggerByName(triggerName)
        if (!trigger)
            throw new Error('Trigger not found')
        return trigger.getTriggerDefinition()
    }

    @Get(':serviceName/reactions')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get all reactions of a service' })
    @ApiOkResponse({ type: GetReactionsResDto })
    @ApiBadRequestResponse()
    getReactions(@Param('serviceName') serviceName: ServiceName): ReactionDefinition[] {
        const service = this.servicesService.getIntegrationByName(serviceName)
        if (!service)
            throw new Error('Service not found')
        return service.getReactions().map((x) => x.getReactionDefinition())
    }

    @Get(':serviceName/reactions/:reactionName')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get a reaction of a service' })
    @ApiOkResponse({ type: GetReactionResDto })
    @ApiBadRequestResponse()
    getReaction(@Param('serviceName') serviceName: ServiceName, @Param('reactionName') reactionName: string): ReactionDefinition {
        const service = this.servicesService.getIntegrationByName(serviceName)
        if (!service)
            throw new Error('Service not found')
        const reaction = service.getReactionByName(reactionName)
        if (!reaction)
            throw new Error('Reaction not found')
        return reaction.getReactionDefinition()
    }

}
