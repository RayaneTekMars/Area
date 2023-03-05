import Integration from './intergration'
import { ServiceName } from '../../common/types/service.type'
import MusicChange from '../triggers/spotify/music-change.trigger'
import type { SpotifyService } from '../services/spotify.service'
import type ReactionIntegration from '../reactions/reaction'
import type TriggerIntegration from '../triggers/trigger'
import NextMusic from '../reactions/spotify/next-music.reaction'
import PreviousMusic from '../reactions/spotify/previous-music.reaction'

class SpotifyIntegration extends Integration {

    private readonly triggerIntegration: TriggerIntegration[] = [
        new MusicChange()
    ]

    private readonly reactionIntegration: ReactionIntegration[] = [
        new NextMusic(this.spotifyService),
        new PreviousMusic(this.spotifyService),
    ]

    constructor(private readonly spotifyService: SpotifyService) {
        super()
    }

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
