/* eslint-disable no-console */
import { ServiceName } from '../../../common/types/service.type'
import ReactionIntegration from '../reaction'
import type { TwitterService } from '../../services/twitter.service'
import type { Field, FieldDefinition } from '../../../common/types/field.type'

class CreateDirectMessage extends ReactionIntegration {

    constructor(private readonly twitterService: TwitterService) {
        super()
    }

    getName(): string {
        return 'CreateDirectMessage'
    }

    getServiceName(): ServiceName {
        return ServiceName.Twitter
    }

    getDescription(): string {
        return 'Create a direct message from your Twitter account to another user'
    }

    getFields(): Field[] {
        return [
            {
                name: 'message',
                value: ''
            },
            {
                name: 'username',
                value: ''
            }
        ]
    }

    getFieldsDefinition(): FieldDefinition[] {
        return [
            {
                name: 'message',
                description: 'The message to send',
                type: 'string',
                required: true,
                default: false
            },
            {
                name: 'username',
                description: 'The username (@example) of the user to send the message to',
                type: 'string',
                required: true,
                default: false
            }
        ]
    }

    run(fields: Map<string, string>, accessToken: string): void {
        console.log('CreateDirectMessage', fields, accessToken)
        const text = fields.get('message') ?? ''
        const username = fields.get('username')?.replace(/^@/, '') ?? ''

        void this.twitterService.createDirectMessage(text, username, accessToken)
    }

}

export default CreateDirectMessage
