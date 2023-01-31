import { ApiProperty } from '@nestjs/swagger'
import { Trigger } from '../types/trigger.type'
import { Reaction } from '../types/reaction.type'

class ScenarioData {

    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    trigger: Trigger

    @ApiProperty()
    reaction: Reaction

}

export class ScenarioResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: {
        id: string
    }

}

export class GetScenarioResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty({
        type: ScenarioData
    })
    data: ScenarioData

}

export class GetScenariosResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty({
        type: Array<ScenarioData>
    })
    data: ScenarioData[]

}
