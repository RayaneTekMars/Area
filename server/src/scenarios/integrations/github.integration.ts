import Integration from './intergration'
import { ServiceName } from '../types/service.type'
import NewFollower from '../triggers/twitter/new-follower.trigger'
import PostTweet from '../reactions/twitter/post-tweet.reaction'
import type ReactionIntegration from '../reactions/reaction'
import type TriggerIntegration from '../triggers/trigger'

class GithubIntegration extends Integration {


    getName(): ServiceName {
        return ServiceName.Github
    }

    getDescription(): string {
        return 'Github Service'
    }

    getTriggers(): TriggerIntegration[] {
        return [
        ]
    }

    getReactions(): ReactionIntegration[] {
        return [
        ]
    }

}

export default GithubIntegration
