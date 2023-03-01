/* eslint-disable no-console */
import { ServiceName } from '../../../common/types/service.type'
import ReactionIntegration from '../reaction'
import type { TwitterService } from '../../services/twitter.service'
import type { Field, FieldDefinition } from '../../../common/types/field.type'

class PostTweet extends ReactionIntegration {

    constructor(private readonly twitterService: TwitterService) {
        super()
    }

    getName(): string {
        return 'PostTweet'
    }

    getServiceName(): ServiceName {
        return ServiceName.Twitter
    }

    getDescription(): string {
        return 'Post a tweet on your Twitter account'
    }

    getFields(): Field[] {
        return [
            {
                name: 'tweet',
                value: ''
            }
        ]
    }

    getFieldsDefinition(): FieldDefinition[] {
        return [
            {
                name: 'tweet',
                description: 'The tweet to post',
                type: 'string',
                required: true,
                default: false
            }
        ]
    }

    run(fields: Map<string, string>, accessToken: string): void {
        console.log('PostTweet', fields, accessToken)
        void this.twitterService.postTweet(fields.get('tweet') ?? '', accessToken)
    }

}

export default PostTweet
