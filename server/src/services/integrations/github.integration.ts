import Integration from './intergration'
import { ServiceName } from '../../common/types/service.type'
import NewCommit from '../triggers/github/new-commit.trigger'
import CreatePullRequest from '../reactions/github/create-pull-request.reaction'
import CreateIssue from '../reactions/github/create-issue'
import type { GithubService } from '../services/github.service'
import type ReactionIntegration from '../reactions/reaction'
import type TriggerIntegration from '../triggers/trigger'

class GithubIntegration extends Integration {

    private readonly triggerIntegration: TriggerIntegration[] = [
        new NewCommit()
    ]

    private readonly reactionIntegration: ReactionIntegration[] = [
        new CreatePullRequest(this.githubService),
        new CreateIssue(this.githubService)
    ]

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
        return this.triggerIntegration
    }

    getReactions(): ReactionIntegration[] {
        return this.reactionIntegration
    }

}

export default GithubIntegration
