import { Field, FieldDefinition } from "src/common/types/field.type";
import { ServiceName } from "src/common/types/service.type";
import { SpotifyService } from "src/services/services/spotify.service";
import ReactionIntegration from "../reaction";

class NextMusic extends ReactionIntegration {

    constructor(private readonly spotifyService: SpotifyService) {
        super();
    }

    getName(): string {
        return 'NextMusic';
    }

    getServiceName(): ServiceName {
        return ServiceName.Spotify
    }

    getDescription(): string {
        return 'Next music';
    }

    getFields(): Field[] {
        return [
            {
                name: 'device_id',
                value: '',
            },
        ];
    }

    getFieldsDefinition(): FieldDefinition[] {
        return [
            {
                name: 'device_id',
                description: 'The device to play the music on',
                type: 'string',
                required: false,
                default: false,
            },
        ];
    }

    getIngredientsDefinition(): any[] {
        return [];
    }

    async run(fields: Map<string, string>, accessToken: string): Promise<void> {
        console.log('Spotify: Next music');
        
        const deviceId = fields.get('device') ?? '';
        void this.spotifyService.nextMusic(deviceId, accessToken);
    }

}

export default NextMusic;