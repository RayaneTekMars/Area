import Integration from './intergration'
import { ServiceName } from '../../common/types/service.type'
import type ReactionIntegration from '../reactions/reaction'
import type TriggerIntegration from '../triggers/trigger'

class SpotifyIntegration extends Integration {

    private readonly triggerIntegration: TriggerIntegration[] = [
    ]

    private readonly reactionIntegration: ReactionIntegration[] = [
    ]

    // constructor(private readonly spotifyService: SpotifyService) {
    //     super()
    // }

    getName(): ServiceName {
        return ServiceName.Spotify
    }

    getDescription(): string {
        return 'Spotify Service'
    }

    getTriggers(): TriggerIntegration[] {
        return this.triggerIntegration
    }

    getReactions(): ReactionIntegration[] {
        return this.reactionIntegration
    }

}

export default SpotifyIntegration