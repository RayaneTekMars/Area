interface Field {
    name: string
    value: string
}

interface FieldDefinition {
    name: string
    description: string
    type: string
    required: boolean
    default: boolean
}

export type { Field, FieldDefinition }
