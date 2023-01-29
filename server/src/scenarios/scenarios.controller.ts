import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScenariosService } from './scenarios.service';
import { ScenarioReqDto } from './dto/scenario.req.dto';
import { ScenarioResDto, GetScenarioResDto, GetScenariosResDto } from './dto/scenario.res.dto';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Account } from '../accounts/entities/account.entity';


@Controller('scenarios')
@ApiTags('scenarios')
@ApiBearerAuth()
export class ScenariosController {

    constructor(
        public readonly scenarioService: ScenariosService,
    ) { }

    @Get('')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get all scenarios from the current user' })
    @ApiOkResponse({ type: GetScenariosResDto })
    @ApiBadRequestResponse()
    async getScenarios(@CurrentUser() user: Account): Promise<GetScenariosResDto> {
        const scenarios = await this.scenarioService.getScenarios(user.id);
        return {
            status: 'success',
            data: scenarios
        };
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get a scenario from the current user' })
    @ApiOkResponse({ type: GetScenarioResDto })
    @ApiBadRequestResponse()
    async getScenario(@CurrentUser() user: Account, @Param('id') id: string): Promise<GetScenarioResDto> {
        const scenario = await this.scenarioService.getScenario(user.id, id);

        if (!scenario) {
            throw new Error('Scenario not found');
        }

        return {
            status: 'success',
            data: scenario
        };
    }

    @Post('create')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Create a new scenario' })
    @ApiOkResponse({ type: ScenarioResDto })
    @ApiBadRequestResponse()
    async createScenario(@CurrentUser() user: Account, @Body() createdScenario: ScenarioReqDto): Promise<ScenarioResDto> {
        const scenario = await this.scenarioService.createScenario(user, createdScenario);
        return {
            status: 'success',
            data: {
                id: scenario.id
            }
        };
    }

    @Put('update/:id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Update an existing scenario' })
    @ApiOkResponse({ type: ScenarioResDto })
    @ApiBadRequestResponse()
    async updateScenario(@CurrentUser() user: Account, @Param('id') id: string, @Body() updatedScenario: ScenarioReqDto): Promise<ScenarioResDto> {
        const scenario = await this.scenarioService.updateScenario(user.id, id, updatedScenario);

        if (!scenario) {
            throw new Error('Scenario not found');
        }

        return {
            status: 'success',
            data: {
                id: scenario.id
            }
        };
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Delete an existing scenario' })
    @ApiOkResponse({ type: ScenarioResDto })
    @ApiBadRequestResponse()
    async deleteScenario(@CurrentUser() user: Account, @Param('id') id: string): Promise<ScenarioResDto> {
        const scenario = await this.scenarioService.deleteScenario(user.id, id);

        if (!scenario) {
            throw new Error('Scenario not found');
        }

        return {
            status: 'success',
            data: {
                id: scenario.id
            }
        };
    }

}
