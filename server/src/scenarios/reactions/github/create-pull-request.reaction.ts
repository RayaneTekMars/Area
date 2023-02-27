/* eslint-disable no-console */
import { ServiceName } from '../../types/service.type'
import ReactionIntegration from '../reaction'
import type { GithubService } from '../../services/github.service'
import type { Field, FieldDefinition } from '../../types/field.type'

class CreatePullRequest extends ReactionIntegration {

    constructor(private readonly githubService: GithubService) {
        super()
    }

    getName(): string {
        return 'CreatePullRequest'
    }

    getServiceName(): ServiceName {
        return ServiceName.Github
    }

    getDescription(): string {
        return 'Create a pull request'
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
            {
                name: 'head',
                value: ''
            },
            {
                name: 'base',
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
                description: 'The title of the pull request',
                type: 'string',
                required: true,
                default: false
            },
            {
                name: 'body',
                description: 'The body of the pull request',
                type: 'string',
                required: false,
                default: false
            },
            {
                name: 'head',
                description: 'The branch to merge into the base branch',
                type: 'string',
                required: true,
                default: false
            },
            {
                name: 'base',
                description: 'The branch to merge the head branch into',
                type: 'string',
                required: true,
                default: false
            }
        ]
    }

    run(fields: Map<string, string>, accessToken: string): void {
        console.log('CreatePullRequest', fields, accessToken)

        const repositoryUrl = fields.get('repository_url') ?? ''
        const title = fields.get('title') ?? ''
        const body = fields.get('body') ?? ''
        const head = fields.get('head') ?? ''
        const base = fields.get('base') ?? ''

        void this.githubService.createPullRequest(repositoryUrl, title, body, head, base, accessToken)
    }
}

export default CreatePullRequest
