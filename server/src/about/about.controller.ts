import { networkInterfaces } from 'node:os'
import { Controller, Get, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { AboutDto } from './dto/about.dto'
import { ServicesService } from '../services/services.service'

@Controller('/')
@ApiTags('About')
export class AboutController {

    constructor(private readonly servicesService: ServicesService) {}

    private getHost = () => {
        const interfaces = networkInterfaces()
        for (const interfaceName of Object.keys(interfaces))
          for (const net of interfaces[interfaceName] ?? [])
            if (net.family === 'IPv4' && !net.internal)
              return net.address
        return '127.0.0.1'
    }

    @Get('/about.json')
    about(@Req() request: Request): AboutDto {
        return {
            client: {
                host: request.hostname
            },
            server: {
                current_time: Math.floor(Date.now() / 1000),
                services: this.servicesService.getIntegrations().map(integration => ({
                    name: integration.getName(),
                    description: integration.getDescription(),
                    actions: integration.getTriggers().map(trigger => ({
                        name: trigger.getName(),
                        description: trigger.getDescription()
                    })),
                    reactions: integration.getReactions().map(reaction => ({
                        name: reaction.getName(),
                        description: reaction.getDescription()
                    }))
                }))
            }
        }
    }
}
