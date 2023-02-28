import Integration from './intergration'
import { ServiceName } from '../types/service.type'
import NewCommit from '../triggers/github/new-commit.trigger'
import CreatePullRequest from '../reactions/github/create-pull-request.reaction'
import CreateIssue from '../reactions/github/create-issue'
import type { GithubService } from '../services/github.service'
import type ReactionIntegration from '../reactions/reaction'
import type TriggerIntegration from '../triggers/trigger'

class GithubIntegration extends Integration {

    constructor(private readonly githubService: GithubService) {
        super()
    }

    getName(): ServiceName {
        return ServiceName.Github
    }

    getDescription(): string {
        return 'Github Service'
    }

    getTriggers(): TriggerIntegration[] {
        return [
            new NewCommit()
        ]
    }

    getReactions(): ReactionIntegration[] {
        return [
            new CreatePullRequest(this.githubService),
            new CreateIssue(this.githubService)
        ]
    }

}

export default GithubIntegration
