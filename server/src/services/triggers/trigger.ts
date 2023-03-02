import type { ServiceName } from '../../common/types/service.type'
import type { IngredientDefinition } from '../../common/types/ingredient.type'
import type { Field, FieldDefinition } from '../../common/types/field.type'
import type { Trigger, TriggerDefinition } from '../../common/types/trigger.type'

abstract class TriggerIntegration {

    abstract getName(): string
    abstract getServiceName(): ServiceName
    abstract getDescription(): string

    abstract getFields(): Field[]
    abstract getFieldsDefinition(): FieldDefinition[]

    abstract getIngredientsDefinition(): IngredientDefinition[]

    getTrigger(): Trigger {
        return {
            name: this.getName(),
            serviceName: this.getServiceName(),
            description: this.getDescription(),
            fields: this.getFields()
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
