import { ServiceName } from '../../../common/types/service.type'
import TriggerIntegration from '../trigger'
import type { IngredientDefinition } from '../../../common/types/ingredient.type'
import type { Field, FieldDefinition } from '../../../common/types/field.type'

class NewCommit extends TriggerIntegration {

    getName(): string {
        return 'NewCommit'
    }

    getServiceName(): ServiceName {
        return ServiceName.Github
    }

    getDescription(): string {
        return 'Trigger when a new commit is pushed to a repository'
    }

    getFields(): Field[] {
        return [
            {
                name: 'repository_url',
                value: ''
            },
            {
                name: 'branch',
                value: 'main'
            }
        ]
    }

    getFieldsDefinition(): FieldDefinition[] {
        return [
            {
                name: 'repository_url',
                description: 'The url of the repository',
                type: 'string',
                required: true,
                default: false
            },
            {
                name: 'branch',
                description: 'The branch to watch',
                type: 'string',
                required: false,
                default: true
            }
        ]
    }

    getIngredientsDefinition(): IngredientDefinition[] {
        return [
            {
                name: 'sha',
                description: 'The SHA of the commit',
                type: 'string'
            },
            {
                name: 'branch',
                description: 'The branch of the commit',
                type: 'string'
            },
            {
                name: 'message',
                description: 'The message of the commit',
                type: 'string'
            },
            {
                name: 'html_url',
                description: 'The url of the commit',
                type: 'string'
            },
            {
                name: 'repository_url',
                description: 'The url of the repository',
                type: 'string'
            },
            {
                name: 'date',
                description: 'The date of the commit',
                type: 'string'
            },
            {
                name: 'authorName',
                description: 'The name of the author',
                type: 'string'
            },
            {
                name: 'authorEmail',
                description: 'The email of the author',
                type: 'string'
            },
            {
                name: 'committerName',
                description: 'The name of the committer',
                type: 'string'
            },
            {
                name: 'committerEmail',
                description: 'The email of the committer',
                type: 'string'
            }
        ]
    }

}

export default NewCommit
