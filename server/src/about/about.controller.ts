import { networkInterfaces } from 'node:os'
import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AboutDto } from './dto/about.dto'

@Controller('/')
@ApiTags('About')
export class AboutController {
    private getHost = () => {
        const nets = networkInterfaces()
        let host = '127.0.0.1'
        for (const name of Object.keys(nets))
            for (const net of nets[name] ?? [])
                if (net.family === 'IPv4' && !net.internal) {
                    host = net.address
                    break
                }

        return host
    }

    @Get('/about.json')
    about(): AboutDto {
        return {
            client: {
                host: this.getHost()
            },
            server: {
                current_time: Math.floor(Date.now() / 1000),
                services: [
                    {
                        name: 'Account',
                        description: 'Account service',
                        actions: [
                            {
                                name: 'Create account',
                                description: 'Create an account'
                            }
                        ],
                        reactions: [
                            {
                                name: 'Account created',
                                description: 'Account created'
                            }
                        ]
                    }
                ]
            }
        }
    }
}
