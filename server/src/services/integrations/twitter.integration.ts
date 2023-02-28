import Integration from './intergration'
import { ServiceName } from '../../common/types/service.type'
import NewFollower from '../triggers/twitter/new-follower.trigger'
import PostTweet from '../reactions/twitter/post-tweet.reaction'
import type { TwitterService } from '../services/twitter.service'
import type ReactionIntegration from '../reactions/reaction'
import type TriggerIntegration from '../triggers/trigger'

class TwitterIntegration extends Integration {

    private readonly triggerIntegration: TriggerIntegration[] = [
        new NewFollower()
    ]

    private readonly reactionIntegration: ReactionIntegration[] = [
        new PostTweet(this.twitterService)
    ]

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
        return this.triggerIntegration
    }

    getReactions(): ReactionIntegration[] {
        return this.reactionIntegration
    }

}

export default TwitterIntegration
