import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scenario } from './entities/scenario.entity';
import { ScenarioReqDto } from './dto/scenario.req.dto';
import { Account } from '../accounts/entities/account.entity';
import { Reaction } from './types/reaction.type';
import { Trigger } from './types/trigger.type';
// import { TwitterService } from './services/twitter.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { TwitterApi } from 'twitter-api-v2';

@Injectable()
export class ScenariosService {

    constructor(
        @InjectRepository(Scenario)
        private readonly scenarioRepository: Repository<Scenario>,
        // private readonly twitterService: TwitterService,
        private readonly subscriptionsService: SubscriptionsService,
    ) { }

    async getScenario(accountId: string, id: string): Promise<Scenario | null> {
        return this.scenarioRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                id: id,
                account: {
                    id: accountId
                }
            }
        });
    }

    async getScenarios(accountId: string): Promise<Scenario[]> {
        return this.scenarioRepository.find({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                account: {
                    id: accountId
                }
            }
        });
    }

    async getScenariosByTrigger(accountId: string, serviceName: string, triggerName: string): Promise<Scenario[]> {
        const scenarios = await this.scenarioRepository.find({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                account: {
                    id: accountId
                }
            }
        });

        return scenarios.filter(x => x.trigger.serviceName === serviceName && x.trigger.name === triggerName);
    }

    async getReaction(accountId: string, serviceName: string, triggerName: string): Promise<Reaction | null> {
        const scenarios = await this.scenarioRepository.find({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                account: {
                    id: accountId
                }
            }
        });

        const scenario = scenarios.find(x => x.trigger.serviceName === serviceName && x.trigger.name === triggerName);

        if (!scenario) {
            return null;
        }

        return scenario.reaction;
    }

    async emit(accountId: string, trigger: Trigger, reaction: Reaction): Promise<void> {

        const subscription = await this.subscriptionsService.getSubscriptionsByAccountIdAndServiceName(accountId, reaction.serviceName);

        if (!subscription) {
            return;
        }

        switch (reaction.serviceName) {
            case 'Twitter':
                switch (reaction.name) {
                    case 'PostTweet':
                        // this.twitterService.postTweet(accountId, subscription.accessToken, "Hello World");
                        const twitterApi = new TwitterApi(subscription.accessToken);
                        const { data: { id: userId } } = await twitterApi.v2.me();

                        const { data: { id: tweetId } } = await twitterApi.v2.tweet("Hello World");
                }
        }

    }


    async createScenario(account: Account, createdScenario: ScenarioReqDto): Promise<Scenario> {
        const scenario = new Scenario();
        scenario.name = createdScenario.name;
        scenario.trigger = createdScenario.trigger;
        scenario.reaction = createdScenario.reaction;
        scenario.account = account;
        return this.scenarioRepository.save(scenario);
    }

    async updateScenario(accountId: string, id: string, updatedScenario: ScenarioReqDto): Promise<Scenario | null> {
        const scenario = await this.scenarioRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                id: id,
                account: {
                    id: accountId
                }
            }
        });
        if (!scenario) {
            return null;
        }
        scenario.name = updatedScenario.name;
        scenario.trigger = updatedScenario.trigger;
        scenario.reaction = updatedScenario.reaction;
        return this.scenarioRepository.save(scenario);
    }

    async deleteScenario(accountId: string, id: string): Promise<Scenario | null> {
        const scenario = await this.scenarioRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                id,
                account: {
                    id: accountId
                }
            }
        });
        if (!scenario) {
            return null;
        }
        return this.scenarioRepository.remove(scenario);
    }

}
