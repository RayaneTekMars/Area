import type { ServiceName } from './service.type'
import type { IngredientDefinition } from './ingredient.type'
import type { Field, FieldDefinition } from './field.type'

interface Trigger {
    name: string
    description: string
    serviceName: ServiceName
    fields: Field[]
}

interface TriggerDefinition {
    name: string
    description: string
    serviceName: ServiceName
    fields: FieldDefinition[]
    ingredients: IngredientDefinition[]
}

export type { Trigger, TriggerDefinition }
