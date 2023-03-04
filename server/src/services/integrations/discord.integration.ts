import Integration from './intergration'
import { ServiceName } from '../../common/types/service.type'
import PostChannelMessage from '../reactions/discord/post-channel-message.reaction'
import NewMessage from '../triggers/discord/new-message.trigger'
import type { DiscordService } from '../services/discord.service'
import type ReactionIntegration from '../reactions/reaction'
import type TriggerIntegration from '../triggers/trigger'

class DiscordIntegration extends Integration {

    private readonly triggerIntegration: TriggerIntegration[] = [
        new NewMessage()
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
