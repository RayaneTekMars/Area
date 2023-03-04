/* eslint-disable no-console */
import { ServiceName } from '../../../common/types/service.type'
import ReactionIntegration from '../reaction'
import type { DiscordService } from '../../services/discord.service'
import type { Field, FieldDefinition } from '../../../common/types/field.type'

class PostChannelMessage extends ReactionIntegration {

    constructor(private readonly discordService: DiscordService) {
        super()
    }

    getName(): string {
        return 'PostChannelMessage'
    }

    getServiceName(): ServiceName {
        return ServiceName.Discord
    }

    getDescription(): string {
        return 'Post a message to a channel'
    }

    getFields(): Field[] {
        return [
            {
                name: 'channel_id',
                value: ''
            },
            {
                name: 'content',
                value: ''
            }
        ]
    }

    getFieldsDefinition(): FieldDefinition[] {
        return [
            {
                name: 'channel_id',
                description: 'The id of the channel',
                type: 'string',
                required: true,
                default: false
            },
            {
                name: 'content',
                description: 'The content of the message',
                type: 'string',
                required: true,
                default: false
            }
        ]
    }

    run(fields: Map<string, string>, accessToken: string): void {
        console.log('PostChannelMessage', fields, accessToken)
        void this.discordService.postChannelMessage(fields.get('channel_id') ?? '', fields.get('content') ?? '')
    }

}

export default PostChannelMessage
