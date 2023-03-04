import { ServiceName } from '../../../common/types/service.type'
import TriggerIntegration from '../trigger'
import type { IngredientDefinition } from '../../../common/types/ingredient.type'
import type { Field, FieldDefinition } from '../../../common/types/field.type'

class NewStream extends TriggerIntegration {

    getName(): string {
        return 'NewStream'
    }

    getServiceName(): ServiceName {
        return ServiceName.Twitch
    }

    getDescription(): string {
        return 'Trigger when a new stream is live'
    }

    getFields(): Field[] {
        return [
            {
                name: 'username',
                value: ''
            }
        ]
    }

    getFieldsDefinition(): FieldDefinition[] {
        return [
            {
                name: 'username',
                description: 'The username of the streamer',
                type: 'string',
                required: true,
                default: false
            }
        ]
    }

    getIngredientsDefinition(): IngredientDefinition[] {
        return [
            {
                name: 'username',
                description: 'The username of the streamer',
                type: 'string'
            },
            {
                name: 'url',
                description: 'The url of the stream',
                type: 'string'
            },
            {
                name: 'title',
                description: 'The title of the stream',
                type: 'string'
            },
            {
                name: 'game',
                description: 'The game of the stream',
                type: 'string'
            },
            {
                name: 'started_at',
                description: 'The date when the stream started',
                type: 'string'
            }
        ]
    }
}

export default NewStream
