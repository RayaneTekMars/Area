import { Injectable } from '@nestjs/common'
import Discord from 'discord.js'
import { ConfigService } from '@nestjs/config'
import { ServicesService } from '../services.service'
import DiscordIntegration from '../integrations/discord.integration'

@Injectable()
export class DiscordService {
    private readonly client: Discord.Client

    constructor(
        private readonly servicesService: ServicesService,
        private readonly configService: ConfigService
    ) {
        const options: Discord.ClientOptions = {
            intents: [
                Discord.IntentsBitField.Flags.GuildMessages,
                Discord.IntentsBitField.Flags.Guilds
            ]
        }
        this.client = new Discord.Client(options)
        this.client.on('ready', () => {
            // eslint-disable-next-line no-console
            console.log('Discord client ready')
        })
        void this.client.login(this.configService.get('DISCORD_BOT_TOKEN'))
        this.servicesService.setIntegration(new DiscordIntegration(this))
    }
}
