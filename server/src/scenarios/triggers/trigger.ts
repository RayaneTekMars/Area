import type { ServiceName } from '../types/service.type'
import type { Ingredient, IngredientDefinition } from '../types/ingredient.type'
import type { Field, FieldDefinition } from '../types/field.type'
import type { Trigger, TriggerDefinition } from '../types/trigger.type'

abstract class TriggerIntegration {

    abstract getName(): string
    abstract getServiceName(): ServiceName
    abstract getDescription(): string

    abstract getFields(): Field[]
    abstract getFieldsDefinition(): FieldDefinition[]

    abstract getIngredients(): Ingredient[]
    abstract getIngredientsDefinition(): IngredientDefinition[]

    getTrigger(): Trigger {
        return {
            name: this.getName(),
            serviceName: this.getServiceName(),
            description: this.getDescription(),
            fields: this.getFields(),
            ingredients: this.getIngredients()
        }
    }

    getTriggerDefinition(): TriggerDefinition {
        return {
            name: this.getName(),
            serviceName: this.getServiceName(),
            description: this.getDescription(),
            fields: this.getFieldsDefinition(),
            ingredients: this.getIngredientsDefinition()
        }
    }

}

export default TriggerIntegration
