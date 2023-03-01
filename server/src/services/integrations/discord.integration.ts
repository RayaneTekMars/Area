import Integration from './intergration'
import { ServiceName } from '../../common/types/service.type'
import type { DiscordService } from '../services/discord.service'
import type ReactionIntegration from '../reactions/reaction'
import type TriggerIntegration from '../triggers/trigger'
import PostChannelMessage from '../reactions/discord/post-message.reaction'

class DiscordIntegration extends Integration {

    private readonly triggerIntegration: TriggerIntegration[] = [
    ]

    private readonly reactionIntegration: ReactionIntegration[] = [
        new PostChannelMessage(this.discordService)
    ]

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
        return this.triggerIntegration
    }

    getReactions(): ReactionIntegration[] {
        return this.reactionIntegration
    }

}

export default DiscordIntegration
