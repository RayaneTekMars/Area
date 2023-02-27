import Integration from './intergration'
import { ServiceName } from '../types/service.type'
import type { DiscordService } from '../services/discord.service'
import type ReactionIntegration from '../reactions/reaction'
import type TriggerIntegration from '../triggers/trigger'

class DiscordIntegration extends Integration {

    constructor(private readonly discordService: DiscordService) {
        super()
    }

    getName(): ServiceName {
        return ServiceName.Discord
    }

    getDescription(): string {
        return 'Discord Service'
    }

    getTriggers(): TriggerIntegration[] {
        return [
        ]
    }

    getReactions(): ReactionIntegration[] {
        return [
        ]
    }

}

export default DiscordIntegration
