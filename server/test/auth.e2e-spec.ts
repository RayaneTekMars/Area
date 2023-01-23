import request from 'supertest'
import { Test } from '@nestjs/testing'
import { AuthService } from '../src/auth/auth.service'
import { TokenService } from '../src/token/token.service'
import { AppModule } from '../src/app.module'
import type { INestApplication } from '@nestjs/common'

describe('Auth', () => {

    let app: INestApplication

    const authService = {
        signupWithLocalCredentials: () => 'account'
    }
    const tokenService = {
        create: () => ({
            jwt: 'jwt'
        })
    }

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        })
            .overrideProvider(AuthService)
            .useValue(authService)
            .overrideProvider(TokenService)
            .useValue(tokenService)
            .compile()

        app = moduleRef.createNestApplication()

        await app.init()
    })

    afterAll(async () => {
        await app.close()
    })

    describe('POST /auth/signup', () => {

        it('should return 400 if the body is malformed', () => request(app.getHttpServer())
            .post('/auth/signup')
            .send({})
            .expect(400))

        it('should return 200', () => request(app.getHttpServer())
            .post('/auth/signup')
            .send({
                email: 'test@example.com',
                password: 'very-strong-password',
                authTokenName: 'Login with e2e tests',
                nickname: 'John Doe',
                username: 'john',
                biography: 'hi this is john'
            })
            .expect(200)
            .expect({
                status: 'success',
                data: {
                    account: authService.signupWithLocalCredentials(),
                    jwt: tokenService.create().jwt
                }
            }))
    })

    describe('POST /auth/login', () => {

        it('should return 401 if the body is malformed', () => request(app.getHttpServer())
            .post('/auth/login')
            .send({})
            .expect(401))
    })
})
