import Integration from './intergration'
import { ServiceName } from '../types/service.type'
import type ReactionIntegration from '../reactions/reaction'
import type TriggerIntegration from '../triggers/trigger'

class TwitchIntegration extends Integration {

    getName(): ServiceName {
        return ServiceName.Twitch
    }

    getDescription(): string {
        return 'Twitch Service'
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

export default TwitchIntegration
