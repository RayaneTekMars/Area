import { Controller, Get, Ip } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AboutDto } from './dto/about.dto'
import { ServicesService } from '../services/services.service'

@Controller('/')
@ApiTags('About')
export class AboutController {

    constructor(private readonly servicesService: ServicesService) {}

    @Get('/about.json')
    about(@Ip() ip: string): AboutDto {
        return {
            client: {
                host: ip
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
