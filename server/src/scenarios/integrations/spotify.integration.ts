import Integration from './intergration'
import { ServiceName } from '../types/service.type'
import type ReactionIntegration from '../reactions/reaction'
import type TriggerIntegration from '../triggers/trigger'

class SpotifyIntegration extends Integration {

    getName(): ServiceName {
        return ServiceName.Spotify
    }

    getDescription(): string {
        return 'Spotify Service'
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

export default SpotifyIntegration
