import Integration from './intergration'
import { ServiceName } from '../types/service.type'
import NewFollower from '../triggers/twitter/new-follower.trigger'
import PostTweet from '../reactions/twitter/post-tweet.reaction'
import type { TwitterService } from '../services/twitter.service'
import type ReactionIntegration from '../reactions/reaction'
import type TriggerIntegration from '../triggers/trigger'

class TwitterIntegration extends Integration {

    constructor(private readonly twitterService: TwitterService) {
        super()
    }

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
            new PostTweet(this.twitterService)
        ]
    }

}

export default TwitterIntegration
