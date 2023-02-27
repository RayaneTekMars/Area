import type TriggerIntegration from '../triggers/trigger'
import type ReactionIntegration from '../reactions/reaction'
import type { ServiceName, Service } from '../types/service.type'

abstract class Integration {

    abstract getName(): ServiceName
    abstract getDescription(): string

    abstract getTriggers(): TriggerIntegration[]
    abstract getReactions(): ReactionIntegration[]

    getTriggerByName(name: string): TriggerIntegration | undefined {
        return this.getTriggers().find((trigger) => trigger.getName() === name)
    }

    getReactionByName(name: string): ReactionIntegration | undefined {
        return this.getReactions().find((reaction) => reaction.getName() === name)
    }

    getService(): Service {
        return {
            name: this.getName(),
            description: this.getDescription(),
            triggers: this.getTriggers().map((trigger) => trigger.getTriggerDefinition()),
            reactions: this.getReactions().map((reaction) => reaction.getReactionDefinition())
        }
    }
}

export default Integration
