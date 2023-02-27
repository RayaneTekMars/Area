import type { ReactionDefinition } from './reaction.type'
import type { TriggerDefinition } from './trigger.type'

enum ServiceName {
    Twitter = 'Twitter',
    Github = 'Github',
    Spotify = 'Spotify',
    Discord = 'Discord',
    Twitch = 'Twitch'
}

interface Service {
    name: ServiceName
    description: string
    triggers: TriggerDefinition[]
    reactions: ReactionDefinition[]
}

export type { Service }
export { ServiceName }
