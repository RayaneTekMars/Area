import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { google } from 'googleapis'
import { extractId, extractName } from '../helpers/google.helper'
import type { Credentials } from 'google-auth-library'

interface Person {
    id: string
    name: string
}

interface TokenInfo {
    sub: string
    name: string
}

@Injectable()
class GoogleApiService {

    constructor(
        private readonly configService: ConfigService
    ) {}

    async getPersonFromCode(code: string): Promise<Person> {

        const oauth2Client = new google.auth.OAuth2(
            this.configService.get<string>('GOOGLE_CLIENT_ID'),
            this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
            this.configService.get<string>('GOOGLE_CALLBACK_URL')
        )

        let tokens: Credentials

        try {
            ({ tokens } = await oauth2Client.getToken(code))
        } catch {
            throw new BadRequestException('The code seems invalid or already used.')
        }

        oauth2Client.setCredentials(tokens)

        const fields = [
            'names',
            'photos',
            'emailAddresses'
        ]

        const people = google.people({
            version: 'v1',
            auth: oauth2Client
        })

        const result = await people.people.get({
            resourceName: 'people/me',
            personFields: fields.join(',')
        })

        if (result.status !== 200)
            throw new BadRequestException('Unable to retrieve information about user.')

        const id = extractId(result.data)
        const name = extractName(result.data)

        if (id === undefined || name === undefined)
            throw new BadRequestException('Unable to retrieve information from Google')

        return {
            id, name
        }
    }

    async getPersonFromAccessToken(accessToken: string): Promise<Person> {

        const url = new URL('https://oauth2.googleapis.com/tokeninfo')
        url.searchParams.set('id_token', accessToken)

        try {
            const response = await fetch(url.href)
                .then((response_) => response_.json() as Promise<TokenInfo>)

            return {
                id: response.sub,
                name: response.name
            }
        } catch {
            throw new BadRequestException('Unable to retrieve information from Google')
        }
    }

}

export {
    GoogleApiService
}
