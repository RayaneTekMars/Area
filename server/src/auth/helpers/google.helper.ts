import type { people_v1 } from 'googleapis'

const extractId = (person: people_v1.Schema$Person): string | undefined => {

    const resourceName = person.resourceName

    if (resourceName === null || resourceName === undefined)
        return undefined

    return resourceName
}

const extractName = (person: people_v1.Schema$Person): string | undefined => {

    if (person.names === undefined)
        return undefined

    const name = person.names.find((currentName) => currentName.metadata?.primary)

    if (name === undefined)
        return undefined

    if (name.givenName === null || name.givenName === undefined)
        return undefined

    return name.givenName
}

export {
    extractId,
    extractName
}
