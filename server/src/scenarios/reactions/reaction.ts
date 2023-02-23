import type { ServiceName } from '../types/service.type'
import type { Field, FieldDefinition } from '../types/field.type'
import type { Reaction, ReactionDefinition } from '../types/reaction.type'

abstract class ReactionIntegration {

    abstract getName(): string
    abstract getServiceName(): ServiceName
    abstract getDescription(): string

    abstract getFields(): Field[]
    abstract getFieldsDefinition(): FieldDefinition[]

    abstract run(fields: Map<string, string>, accessToken: string): void

    getReaction(): Reaction {
        return {
            name: this.getName(),
            serviceName: this.getServiceName(),
            description: this.getDescription(),
            fields: this.getFields()
        }
    }

    getReactionDefinition(): ReactionDefinition {
        return {
            name: this.getName(),
            serviceName: this.getServiceName(),
            description: this.getDescription(),
            fields: this.getFieldsDefinition()
        }
    }

}

export default ReactionIntegration
