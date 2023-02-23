/* eslint-disable no-console */
import { TwitterApi } from 'twitter-api-v2'
import { ServiceName } from '../../types/service.type'
import ReactionIntegration from '../reaction'
import type { Field, FieldDefinition } from '../../types/field.type'

class PostTweet extends ReactionIntegration {

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
        const twitterApi = new TwitterApi(accessToken)

        void twitterApi.v2.tweet(fields.get('tweet') ?? '')
    }

}

export default PostTweet
