import type { ServiceName } from './service.type'
import type { Field, FieldDefinition } from './field.type'

interface Reaction {
    name: string
    description: string
    serviceName: ServiceName
    fields: Field[]
}

interface ReactionDefinition {
    name: string
    description: string
    serviceName: ServiceName
    fields: FieldDefinition[]
}

export type { Reaction, ReactionDefinition }
