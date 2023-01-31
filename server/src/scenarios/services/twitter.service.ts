import { Injectable } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';
import { ScenariosService } from '../scenarios.service';
import { Trigger } from '../types/trigger.type';

interface Follower {
    id: string;
    name: string;
    username: string;
}

@Injectable()
export class TwitterService {

    Followers: Array<{ accountId: string, userId: string, followers: Array<string> }>

    constructor(private readonly scenariosService: ScenariosService) {
        this.Followers = [];
    }

    async getNewFollowers(accountId: string, accessToken: string): Promise<Follower[]> {
        const twitterApi = new TwitterApi(accessToken);
        const { data: { id: userId } } = await twitterApi.v2.me();
        const lastFollowers = this.Followers.find(x => x.accountId === accountId)?.followers;
        const { data: followers } = await twitterApi.v2.followers(userId);

        const newFollowers = followers.filter(x => !lastFollowers?.includes(x.id));
        this.Followers = [
            ...this.Followers.filter(x => x.accountId !== accountId),
            { accountId, userId, followers: followers.map(x => x.id) }
        ];

        return newFollowers.map(({ id, name, username }) => ({ id, name, username }));
    }

    async triggerNewFollower(accountId: string, follower: Follower) {
        const trigger: Trigger = {
            name: 'NewFollower',
            serviceName: 'Twitter',
            params: []
        };

        const reaction = await this.scenariosService.getReaction(
            accountId,
            'Twitter',
            trigger.name,
        );

        if (!reaction) {
            return;
        }

        reaction.params = reaction.params.concat([
            { name: 'id', value: follower.id, required: false },
            { name: 'name', value: follower.name, required: false },
            { name: 'username', value: follower.username, required: false },
        ]);

        this.scenariosService.emit(accountId, trigger, reaction);
    }

    async postTweet(accountId: string, accessToken: string, tweet: string) {

        const twitterApi = new TwitterApi(accessToken);
        const { data: { id: userId } } = await twitterApi.v2.me();

        const { data: { id: tweetId } } = await twitterApi.v2.tweet(tweet);

        return tweetId;
    }

}
