import { ServiceName } from '../../types/service.type'
import TriggerIntegration from '../trigger'
import type { Ingredient, IngredientDefinition } from '../../types/ingredient.type'
import type { Field, FieldDefinition } from '../../types/field.type'

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
        return []
    }

    getFieldsDefinition(): FieldDefinition[] {
        return []
    }

    getIngredients(): Ingredient[] {
        return [
            { 
                name: 'id',
                value: ''
            },
            {
                name: 'content',
                value: ''
            },
            {
                name: 'author',
                value: ''
            },
            {
                name: 'channel',
                value: ''
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
                name: 'channel',
                description: 'The channel the message was sent in',
                type: 'string'
            }
        ]
    }

}

export default NewMessage
