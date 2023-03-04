/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import Discord from 'discord.js'
import { ConfigService } from '@nestjs/config'
import { ServicesService } from '../services.service'
import DiscordIntegration from '../integrations/discord.integration'
import type { Scenario } from 'src/scenarios/entities/scenario.entity'

interface Message {
    id: string
    content: string
    author: string
    channelId: string
    channelName: string
}

@Injectable()
export class DiscordService {

    LastMessage: {
        accountId: string
        scenarioId: string
        channelId: string
        messageId: number
    }[]

    private readonly client: Discord.Client

    constructor(
        private readonly servicesService: ServicesService,
        private readonly configService: ConfigService
    ) {
        const options: Discord.ClientOptions = {
            intents: [
                Discord.IntentsBitField.Flags.GuildMessages,
                Discord.IntentsBitField.Flags.Guilds,
                Discord.IntentsBitField.Flags.MessageContent
            ]
        }
        this.client = new Discord.Client(options)
        this.client.on('ready', () => {
            console.log('Discord: Ready')
        })

        this.LastMessage = []
        void this.client.login(this.configService.get('DISCORD_BOT_TOKEN'))
        this.servicesService.setIntegration(new DiscordIntegration(this))
    }

    async getNewMessages(accountId: string, scenario: Scenario): Promise<Message[]> {
        try {
            const channelId = scenario.trigger.fields.find((x) => x.name === 'channel_id')?.value ?? ''
            const scenarioId = scenario.id

            const { messageId: lastMessage, channelId: lastChannel } = this.LastMessage.find(
                (x) => x.accountId === accountId && x.scenarioId === scenarioId
            ) ?? { messageId: 0, channelId: '' }

            const discordChannel = await this.client.channels.fetch(channelId)
            if (discordChannel instanceof Discord.TextChannel) {
                const messages = await discordChannel.messages.fetch({ limit: 100 })
                const newMessages: Message[] = messages.filter((x) => Number(x.id) > lastMessage && !x.author.bot)
                    .map((x) => ({
                        id: x.id,
                        content: x.content,
                        author: x.author.username,
                        channelId: x.channelId,
                        channelName: x.channel.name
                    }))

                this.LastMessage = [
                    ...this.LastMessage.filter((x) => x.accountId !== accountId && x.scenarioId !== scenarioId),
                    { accountId, scenarioId, channelId, messageId: Number(newMessages[0]?.id ?? (lastChannel === channelId) ? lastMessage : 0) }
                ]

                return (lastChannel === channelId) ? newMessages : []
            }
            console.error('Channel is not a text channel')
            return []
        } catch (error) {
            console.error(error)
        }
        return []
    }

    async triggerNewMessage(accountId: string, scenario: Scenario, message: Message): Promise<void> {
        const ingredients = new Map<string, string>([
            ['id', message.id],
            ['content', message.content],
            ['author', message.author],
            ['channel_id', message.channelId],
            ['channel_name', message.channelName]
        ])
        await this.servicesService.run(accountId, scenario, ingredients)
    }

    async postChannelMessage(channelId: string, content: string): Promise<void> {
        try {
            const discordChannel = await this.client.channels.fetch(channelId)
            if (discordChannel instanceof Discord.TextChannel)
                await discordChannel.send(content)
            else
                console.error('Channel is not a text channel')
        } catch (error) {
            console.error(error)
        }
    }
}
