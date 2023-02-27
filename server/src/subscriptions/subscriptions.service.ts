import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Subscription } from './entities/subscription.entity'
import type { ServiceName } from '../scenarios/types/service.type'
import type { Account } from '../accounts/entities/account.entity'


@Injectable()
export class SubscriptionsService {

    constructor(
        @InjectRepository(Subscription)
        private readonly subscriptionRepository: Repository<Subscription>
    ) {}

    async getSubscription(serviceName: ServiceName, accountId: string): Promise<Subscription | null> {
        return this.subscriptionRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                serviceName,
                account: {
                    id: accountId
                }
            }
        })
    }

    async getSubscriptions(accountId: string): Promise<Subscription[]> {
        return this.subscriptionRepository.find({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                account: {
                    id: accountId
                }
            }
        })
    }

    async getSubscriptionsByServiceName(serviceName: ServiceName): Promise<Subscription[]> {
        return this.subscriptionRepository.find({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                serviceName
            }
        })
    }

    async getSubscriptionsByAccountIdAndServiceName(accountId: string, serviceName: ServiceName): Promise<Subscription | null> {
        return this.subscriptionRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                serviceName,
                account: {
                    id: accountId
                }
            }
        })
    }

    async createSubscription(serviceName: ServiceName, account: Account, accessToken: string, refreshToken: string, expiresIn: number): Promise<Subscription> {
        const subscription = new Subscription()
        subscription.serviceName = serviceName
        subscription.account = account
        subscription.accessToken = accessToken
        subscription.refreshToken = refreshToken
        subscription.expiresIn = expiresIn

        return this.subscriptionRepository.save(subscription)
    }

    async updateSubscription(serviceName: ServiceName, accountId: string, accessToken: string, refreshToken: string, expiresIn: number): Promise<Subscription | undefined> {

        const subscription = await this.subscriptionRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                serviceName,
                account: {
                    id: accountId
                }
            }
        })

        if (!subscription)
            return

        subscription.accessToken = accessToken
        subscription.refreshToken = refreshToken
        subscription.expiresIn = expiresIn

        return this.subscriptionRepository.save(subscription)
    }

    async deleteSubscription(serviceName: ServiceName, accountId: string): Promise<Subscription | undefined> {
        const subscription = await this.subscriptionRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                serviceName,
                account: {
                    id: accountId
                }
            }
        })

        if (!subscription)
            return

        return this.subscriptionRepository.remove(subscription)
    }

}
