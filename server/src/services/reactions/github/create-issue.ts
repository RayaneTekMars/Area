/* eslint-disable no-console */
import { ServiceName } from '../../../common/types/service.type'
import ReactionIntegration from '../reaction'
import type { GithubService } from '../../services/github.service'
import type { Field, FieldDefinition } from '../../../common/types/field.type'

class CreateIssue extends ReactionIntegration {

    constructor(private readonly githubService: GithubService) {
        super()
    }

    getName(): string {
        return 'CreateIssue'
    }

    getServiceName(): ServiceName {
        return ServiceName.Github
    }

    getDescription(): string {
        return 'Create a new issue'
    }

    getFields(): Field[] {
        return [
            {
                name: 'repository_url',
                value: ''
            },
            {
                name: 'title',
                value: ''
            },
            {
                name: 'body',
                value: ''
            },
            /*
             * {
             *     name: 'assignees',
             *     value: ''
             * },
             * {
             *     name: 'labels',
             *     value: ''
             * },
             */
            {
                name: 'milestone',
                value: ''
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
                name: 'title',
                description: 'The title of the issue',
                type: 'string',
                required: true,
                default: false
            },
            {
                name: 'body',
                description: 'The body of the issue',
                type: 'string',
                required: false,
                default: false
            },
            {
                name: 'milestone',
                description: 'The milestone of the issue',
                type: 'number',
                required: false,
                default: false
            }
        ]
    }

    run(fields: Map<string, string>, accessToken: string): void {
        console.log('CreateIssue', fields, accessToken)

        const repositoryUrl = fields.get('repository_url') ?? ''
        const title = fields.get('title') ?? ''
        const body = fields.get('body') ?? ''
        const milestone = (fields.get('milestone') === '') ? undefined : fields.get('milestone')

        void this.githubService.createIssue(repositoryUrl, title, body, milestone, accessToken)
    }
}

export default CreateIssue
