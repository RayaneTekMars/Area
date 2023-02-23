import type { Reaction } from './reaction.type'
import type { Trigger } from './trigger.type'

enum ServiceName {
    Twitter = 'Twitter',
    Github = 'Github'
}

interface Service {
    name: ServiceName
    description: string
    triggers: Trigger[]
    reactions: Reaction[]
}

export type { Service }
export { ServiceName }
