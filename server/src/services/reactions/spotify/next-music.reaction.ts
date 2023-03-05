/* eslint-disable no-console */
import { ServiceName } from 'src/common/types/service.type'
import ReactionIntegration from '../reaction'
import type { IngredientDefinition } from 'src/common/types/ingredient.type'
import type { Field, FieldDefinition } from 'src/common/types/field.type'
import type { SpotifyService } from 'src/services/services/spotify.service'

class NextMusic extends ReactionIntegration {

    constructor(private readonly spotifyService: SpotifyService) {
        super()
    }

    getName(): string {
        return 'NextMusic'
    }

    getServiceName(): ServiceName {
        return ServiceName.Spotify
    }

    getDescription(): string {
        return 'Next music'
    }

    getFields(): Field[] {
        return [
            {
                name: 'device_id',
                value: ''
            }
        ]
    }

    getFieldsDefinition(): FieldDefinition[] {
        return [
            {
                name: 'device_id',
                description: 'The device to play the music on',
                type: 'string',
                required: false,
                default: false
            }
        ]
    }

    getIngredientsDefinition(): IngredientDefinition[] {
        return []
    }

    run(fields: Map<string, string>, accessToken: string): void {
        console.log('NextMusic', fields, accessToken)
        const deviceId = fields.get('device_id') ?? ''
        void this.spotifyService.nextMusic(deviceId, accessToken)
    }

}

export default NextMusic
