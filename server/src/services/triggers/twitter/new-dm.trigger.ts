import { ServiceName } from '../../../common/types/service.type'
import TriggerIntegration from '../trigger'
import type { IngredientDefinition } from '../../../common/types/ingredient.type'
import type { Field, FieldDefinition } from '../../../common/types/field.type'

class NewDirectMessage extends TriggerIntegration {

    getName(): string {
        return 'NewDirectMessage'
    }

    getServiceName(): ServiceName {
        return ServiceName.Twitter
    }

    getDescription(): string {
        return 'Trigger when a new direct message is received'
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
                description: 'The username (@example) of the user to listen to (optional)',
                type: 'string',
                required: false,
                default: true
            }
        ]
    }

    getIngredientsDefinition(): IngredientDefinition[] {
        return [
            {
                name: 'id',
                description: 'The id of the direct message',
                type: 'string'
            },
            {
                name: 'text',
                description: 'The text of the direct message',
                type: 'string'
            },
            {
                name: 'sender_id',
                description: 'The id of the sender',
                type: 'string'
            },
            {
                name: 'sender_name',
                description: 'The name of the sender',
                type: 'string'
            },
            {
                name: 'sender_username',
                description: 'The username of the sender',
                type: 'string'
            }
        ]
    }

}

export default NewDirectMessage
