import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Scenario } from './entities/scenario.entity'
import TwitterIntegration from './integrations/twitter.integration'
import { SubscriptionsService } from '../subscriptions/subscriptions.service'
import type Integration from './integrations/intergration'
import type { ScenarioReqDto } from './dto/scenario.req.dto'
import type { Account } from '../accounts/entities/account.entity'
import type { Reaction } from './types/reaction.type'
import type { Trigger } from './types/trigger.type'
import type { ServiceName } from './types/service.type'

@Injectable()
export class ScenariosService {

    private integrations = [
        new TwitterIntegration()
    ]

    constructor(
        @InjectRepository(Scenario)
        private readonly scenarioRepository: Repository<Scenario>,
        private readonly subscriptionsService: SubscriptionsService
    ) {}

    getIntegrations(): Integration[] {
        return this.integrations
    }

    getIntegrationByName(name: ServiceName): Integration | undefined {
        return this.getIntegrations().find(integration => integration.getName() === name)
    }

    async getScenario(accountId: string, id: string): Promise<Scenario | null> {
        return this.scenarioRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                id,
                account: {
                    id: accountId
                }
            }
        })
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
        })
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
        })

        return scenarios.filter(x => x.trigger.serviceName === serviceName && x.trigger.name === triggerName)
    }

    async getReaction(accountId: string, serviceName: string, triggerName: string): Promise<Reaction | undefined> {

        const scenarios = await this.scenarioRepository.find({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                account: {
                    id: accountId
                }
            }
        })

        const scenario = scenarios.find(x => x.trigger.serviceName === serviceName && x.trigger.name === triggerName)

        if (!scenario)
            return

        return scenario.reaction
    }

    async emit(accountId: string, trigger: Trigger, reaction: Reaction): Promise<void> {

        const service = this.getIntegrationByName(reaction.serviceName)
        if (!service)
            return

        const subscription = await this.subscriptionsService.getSubscriptionsByAccountIdAndServiceName(accountId, reaction.serviceName)
        if (!subscription)
            return

        const reactionIntegration = service.getReactionByName(reaction.name)
        if (!reactionIntegration)
            return

        const fields = new Map<string, string>()

        for (let { name, value } of reaction.fields) {
            value = value.replace(/{{(.*?)}}/g, (_, p1) => trigger.ingredients.find(x => x.name === p1)?.value ?? '')
            fields.set(name, value)
        }

        reactionIntegration.run(fields, subscription.accessToken)

    }


    async createScenario(account: Account, createdScenario: ScenarioReqDto): Promise<Scenario> {

        const scenario = new Scenario()

        scenario.name = createdScenario.name
        scenario.trigger = createdScenario.trigger
        scenario.reaction = createdScenario.reaction
        scenario.account = account

        return this.scenarioRepository.save(scenario)
    }

    async updateScenario(accountId: string, id: string, updatedScenario: ScenarioReqDto): Promise<Scenario | undefined> {

        const scenario = await this.scenarioRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                id,
                account: {
                    id: accountId
                }
            }
        })

        if (!scenario)
            return

        scenario.name = updatedScenario.name
        scenario.trigger = updatedScenario.trigger
        scenario.reaction = updatedScenario.reaction

        return this.scenarioRepository.save(scenario)
    }

    async deleteScenario(accountId: string, id: string): Promise<Scenario | undefined> {

        const scenario = await this.scenarioRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                id,
                account: {
                    id: accountId
                }
            }
        })

        if (!scenario)
            return

        return this.scenarioRepository.remove(scenario)
    }

}
