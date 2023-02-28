import { ServiceName } from '../../../common/types/service.type'
import TriggerIntegration from '../trigger'
import type { IngredientDefinition } from '../../../common/types/ingredient.type'
import type { Field, FieldDefinition } from '../../../common/types/field.type'

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
