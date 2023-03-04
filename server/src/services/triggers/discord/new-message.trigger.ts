import { ServiceName } from '../../../common/types/service.type'
import TriggerIntegration from '../trigger'
import type { IngredientDefinition } from '../../../common/types/ingredient.type'
import type { Field, FieldDefinition } from '../../../common/types/field.type'

class NewMessage extends TriggerIntegration {

    getName(): string {
        return 'NewMessage'
    }

    getServiceName(): ServiceName {
        return ServiceName.Discord
    }

    getDescription(): string {
        return 'Trigger when a new message is sent in a channel'
    }

    getFields(): Field[] {
        return [
            {
                name: 'channel_id',
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
            }
        ]
    }

    getIngredientsDefinition(): IngredientDefinition[] {
        return [
            {
                name: 'id',
                description: 'The id of the message',
                type: 'string'
            },
            {
                name: 'content',
                description: 'The content of the message',
                type: 'string'
            },
            {
                name: 'author',
                description: 'The author of the message',
                type: 'string'
            },
            {
                name: 'channel_id',
                description: 'The id of the channel the message was sent in',
                type: 'string'
            },
            {
                name: 'channel_name',
                description: 'The name of the channel the message was sent in',
                type: 'string'
            }
        ]
    }

}

export default NewMessage
