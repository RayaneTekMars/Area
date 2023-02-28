import { Injectable } from '@nestjs/common'
import { SubscriptionsService } from '../subscriptions/subscriptions.service'
import type { Scenario } from '../scenarios/entities/scenario.entity'
import type { ServiceName } from '../common/types/service.type'
import type Integration from './integrations/intergration'


@Injectable()
export class ServicesService {

    private integrations: Integration[]

    constructor(private readonly subscriptionsService: SubscriptionsService) {
        this.integrations = []
    }

    setIntegration(integration: Integration) {
        this.integrations = [...this.integrations, integration]
    }

    getIntegrations(): Integration[] {
        return this.integrations
    }

    getIntegrationByName(name: ServiceName): Integration | undefined {
        return this.integrations.find(
            (integration) => integration.getName() === name
        )
    }

    async run(accountId: string, scenario: Scenario, ingredients: Map<string, string>): Promise<void> {
        const serviceIntergration = this.getIntegrationByName(scenario.reaction.serviceName)
        if (!serviceIntergration)
            return
        const subscription = await this.subscriptionsService
            .getSubscriptionsByAccountIdAndServiceName(
                accountId,
                scenario.reaction.serviceName
            )
        if (!subscription)
            return
        const reactionIntegration = serviceIntergration.getReactionByName(scenario.reaction.name)
        if (!reactionIntegration)
            return
        const fields = new Map<string, string>()
        for (let { name, value } of scenario.reaction.fields) {
            value = value.replace(
                /{{(.*?)}}/g,
                (_, p1: string) => ingredients.get(p1) ?? `{{${p1}}}`
            )
            fields.set(name, value)
        }
        reactionIntegration.run(fields, subscription.accessToken)
    }
}
