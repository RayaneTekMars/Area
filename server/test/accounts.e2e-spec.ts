import request from 'supertest'
import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { AccountsService } from '../src/accounts/accounts.service'
import type { INestApplication } from '@nestjs/common'

describe('Accounts', () => {

    let app: INestApplication

    const accountsService = {
        update: () => 'account',
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        delete: () => {}
    }

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        })
            .overrideProvider(AccountsService)
            .useValue(accountsService)
            .compile()

        app = moduleRef.createNestApplication()

        await app.init()
    })

    afterAll(async () => {
        await app.close()
    })

    describe('GET /account/me', () => {

        it('should return 401 if the user is not logged', () => request(app.getHttpServer())
            .get('/account/me')
            .expect(401))

        describe('logged', () => {
            let jwt = ''
            let account = ''

            beforeEach(async () => {
                const result = await request(app.getHttpServer())
                    .post('/auth/login')
                    .send({
                        email: 'admin@example.com',
                        password: 'password',
                        authTokenName: 'Login with e2e tests'
                    })

                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                account = result.body.data.account
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                jwt = result.body.data.jwt
            })

            it('should return 200', () => request(app.getHttpServer())
                .get('/account/me')
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200)
                .expect({
                    status: 'success',
                    data: account
                }))
        })
    })

    describe('PATCH /account/me', () => {

        it('should return 401 if the user is not logged', () => request(app.getHttpServer())
            .patch('/account/me')
            .send({})
            .expect(401))

        describe('logged', () => {
            let jwt = ''

            beforeEach(async () => {
                const result = await request(app.getHttpServer())
                    .post('/auth/login')
                    .send({
                        email: 'admin@example.com',
                        password: 'password',
                        authTokenName: 'Login with e2e tests'
                    })

                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                jwt = result.body.data.jwt
            })

            it('should return 200', () => request(app.getHttpServer())
                .patch('/account/me')
                .send({})
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200)
                .expect({
                    status: 'success',
                    data: accountsService.update()
                }))
        })
    })

    describe('DELETE /account/me', () => {

        it('should return 401 if the user is not logged', () => request(app.getHttpServer())
            .delete('/account/me')
            .send({})
            .expect(401))

        describe('logged', () => {
            let jwt = ''

            beforeEach(async () => {
                const result = await request(app.getHttpServer())
                    .post('/auth/login')
                    .send({
                        email: 'admin@example.com',
                        password: 'password',
                        authTokenName: 'Login with e2e tests'
                    })

                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                jwt = result.body.data.jwt
            })

            it('should return 204', () => request(app.getHttpServer())
                .delete('/account/me')
                .set('Authorization', `Bearer ${jwt}`)
                .expect(204))
        })
    })

})
