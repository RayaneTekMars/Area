interface Ingredient {
    name: string
    value: string
}

interface IngredientDefinition {
    name: string
    description: string
    type: string
}

export type { Ingredient, IngredientDefinition }
