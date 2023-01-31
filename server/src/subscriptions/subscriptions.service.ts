import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { Account } from '../accounts/entities/account.entity';


@Injectable()
export class SubscriptionsService {

    constructor(
        @InjectRepository(Subscription)
        private readonly subscriptionRepository: Repository<Subscription>
    ) { }

    async getSubscription(serviceName: string, accountId: string): Promise<Subscription | null> {
        return this.subscriptionRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                serviceName,
                account: {
                    id: accountId
                }
            }
        });
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
        });
    }

    async getSubscriptionsByServiceName(serviceName: string): Promise<Subscription[]> {
        return this.subscriptionRepository.find({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                serviceName
            }
        });
    }

    async getSubscriptionsByAccountIdAndServiceName(accountId: string, serviceName: string): Promise<Subscription | null> {
        return this.subscriptionRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                serviceName,
                account: {
                    id: accountId
                }
            }
        });
    }

    async createSubscription(serviceName: string, account: Account, accessToken: string, refreshToken: string, expiresIn: number): Promise<Subscription> {
        const subscription = new Subscription();
        subscription.serviceName = serviceName;
        subscription.account = account;
        subscription.accessToken = accessToken;
        subscription.refreshToken = refreshToken;
        subscription.expiresIn = expiresIn;

        return this.subscriptionRepository.save(subscription);
    }

    async updateSubscription(serviceName: string, accountId: string, accessToken: string, refreshToken: string, expiresIn: number): Promise<Subscription | null> {
        const subscription = await this.subscriptionRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                serviceName,
                account: {
                    id: accountId
                }
            }
        });

        if (!subscription) {
            return null;
        }

        subscription.accessToken = accessToken;
        subscription.refreshToken = refreshToken;
        subscription.expiresIn = expiresIn;

        return this.subscriptionRepository.save(subscription);
    }

    async deleteSubscription(serviceName: string, accountId: string): Promise<Subscription | null> {
        const subscription = await this.subscriptionRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                serviceName,
                account: {
                    id: accountId
                }
            }
        });

        if (!subscription) {
            return null;
        }

        return this.subscriptionRepository.remove(subscription);
    }

}
