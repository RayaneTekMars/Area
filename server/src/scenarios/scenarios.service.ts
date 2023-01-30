import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scenario } from './entities/scenario.entity';
import { ScenarioReqDto } from './dto/scenario.req.dto';
import { Account } from '../accounts/entities/account.entity';

@Injectable()
export class ScenariosService {

    constructor(
        @InjectRepository(Scenario)
        private readonly scenarioRepository: Repository<Scenario>
    ) { }

    async getScenario(accountId: string, id: string): Promise<Scenario | null> {
        return this.scenarioRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                id: id,
                account: {
                    id: accountId
                }
            }
        });
    }

    async getScenarios(accountId: string): Promise<Scenario[]> {
        return this.scenarioRepository.find({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                account: {
                    id: accountId
                }
            }
        });
    }

    async createScenario(account: Account, createdScenario: ScenarioReqDto): Promise<Scenario> {
        const scenario = new Scenario();
        scenario.name = createdScenario.name;
        scenario.trigger = createdScenario.trigger;
        scenario.reaction = createdScenario.reaction;
        scenario.account = account;
        return this.scenarioRepository.save(scenario);
    }

    async updateScenario(accountId: string, id: string, updatedScenario: ScenarioReqDto): Promise<Scenario | null> {
        const scenario = await this.scenarioRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                id: id,
                account: {
                    id: accountId
                }
            }
        });
        if (!scenario) {
            return null;
        }
        scenario.name = updatedScenario.name;
        scenario.trigger = updatedScenario.trigger;
        scenario.reaction = updatedScenario.reaction;
        return this.scenarioRepository.save(scenario);
    }

    async deleteScenario(accountId: string, id: string): Promise<Scenario | null> {
        const scenario = await this.scenarioRepository.findOne({
            relations: ['account'],
            loadRelationIds: true,
            where: {
                id,
                account: {
                    id: accountId
                }
            }
        });
        if (!scenario) {
            return null;
        }
        return this.scenarioRepository.remove(scenario);
    }

}
