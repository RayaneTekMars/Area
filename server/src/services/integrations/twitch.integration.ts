import Integration from './intergration'
import { ServiceName } from '../../common/types/service.type'
import NewStream from '../triggers/twitch/new-stream.trigger'
import type { TwitchService } from '../services/twitch.service'
import type ReactionIntegration from '../reactions/reaction'
import type TriggerIntegration from '../triggers/trigger'

class TwitchIntegration extends Integration {

    private readonly triggerIntegration: TriggerIntegration[] = [
        new NewStream()
    ]

    private readonly reactionIntegration: ReactionIntegration[] = [
    ]

    constructor(private readonly twitchService: TwitchService) {
        super()
    }

    getName(): ServiceName {
        return ServiceName.Twitch
    }

    getDescription(): string {
        return 'Twitch Service'
    }

    getTriggers(): TriggerIntegration[] {
        return this.triggerIntegration
    }

    getReactions(): ReactionIntegration[] {
        return this.reactionIntegration
    }

}

export default TwitchIntegration
