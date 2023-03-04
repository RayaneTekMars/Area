import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Scenario } from './entities/scenario.entity'
import type { ScenarioReqDto } from './dto/scenario.req.dto'
import type { Account } from '../about/accounts/entities/account.entity'

@Injectable()
export class ScenariosService {

    constructor(
        @InjectRepository(Scenario)
        private readonly scenarioRepository: Repository<Scenario>
    ) {}

    async getScenario(accountId: string, id: string): Promise<Scenario | null> {
        return this.scenarioRepository.findOne({
            relations: ['account'],
            where: {
                id,
                account: {
                    id: accountId
                }
            }
        })
    }

    async getScenarios(accountId: string): Promise<Scenario[]> {
        return this.scenarioRepository.find({
            relations: ['account'],
            where: {
                account: {
                    id: accountId
                }
            }
        })
    }

    async getScenariosByTrigger(accountId: string, serviceName: string, triggerName: string): Promise<Scenario[]> {
        const scenarios = await this.scenarioRepository.find({
            relations: ['account'],
            where: {
                account: {
                    id: accountId
                }
            }
        })

        return scenarios.filter(
            (x) =>
                x.trigger.serviceName === serviceName && x.trigger.name === triggerName
        )
    }

    async createScenario(account: Account, createdScenario: ScenarioReqDto): Promise<Scenario> {
        const scenario = new Scenario()

        scenario.name = createdScenario.name
        scenario.trigger = createdScenario.trigger
        scenario.reaction = createdScenario.reaction
        scenario.account = account

        return this.scenarioRepository.save(scenario)
    }

    async updateScenario(accountId: string, id: string, updatedScenario: ScenarioReqDto): Promise<Scenario | undefined> {
        const scenario = await this.scenarioRepository.findOne({
            relations: ['account'],
            where: {
                id,
                account: {
                    id: accountId
                }
            }
        })

        if (!scenario)
            return

        scenario.name = updatedScenario.name
        scenario.trigger = updatedScenario.trigger
        scenario.reaction = updatedScenario.reaction

        return this.scenarioRepository.save(scenario)
    }

    async deleteScenario(accountId: string, id: string): Promise<Scenario | undefined> {
        const scenario = await this.scenarioRepository.findOne({
            relations: ['account'],
            where: {
                id,
                account: {
                    id: accountId
                }
            }
        })

        if (!scenario)
            return

        return this.scenarioRepository.remove(scenario)
    }

}
