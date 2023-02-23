import Integration from './intergration'
import { ServiceName } from '../types/service.type'
import NewFollower from '../triggers/twitter/new-follower.trigger'
import PostTweet from '../reactions/twitter/post-tweet.reaction'
import type ReactionIntegration from '../reactions/reaction'
import type TriggerIntegration from '../triggers/trigger'

class TwitterIntegration extends Integration {


    getName(): ServiceName {
        return ServiceName.Twitter
    }

    getDescription(): string {
        return 'Twitter Service'
    }

    getTriggers(): TriggerIntegration[] {
        return [
            new NewFollower()
        ]
    }

    getReactions(): ReactionIntegration[] {
        return [
            new PostTweet()
        ]
    }

}

export default TwitterIntegration
