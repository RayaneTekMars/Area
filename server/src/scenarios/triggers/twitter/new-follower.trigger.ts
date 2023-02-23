import { ServiceName } from '../../types/service.type'
import TriggerIntegration from '../trigger'
import type { Ingredient, IngredientDefinition } from '../../types/ingredient.type'
import type { Field, FieldDefinition } from '../../types/field.type'

class NewFollower extends TriggerIntegration {

    getName(): string {
        return 'NewFollower'
    }

    getServiceName(): ServiceName {
        return ServiceName.Twitter
    }

    getDescription(): string {
        return 'Trigger when a new person follows you on Twitter'
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
                name: 'name',
                value: ''
            },
            {
                name: 'username',
                value: ''
            }
        ]
    }

    getIngredientsDefinition(): IngredientDefinition[] {
        return [
            {
                name: 'id',
                description: 'The id of the new follower',
                type: 'string'
            },
            {
                name: 'name',
                description: 'The name of the new follower',
                type: 'string'
            },
            {
                name: 'username',
                description: 'The username of the new follower',
                type: 'string'
            }
        ]
    }

}

export default NewFollower
