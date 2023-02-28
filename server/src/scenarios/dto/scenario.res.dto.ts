import { ApiProperty } from '@nestjs/swagger'
import { Trigger } from '../../common/types/trigger.type'
import { Reaction } from '../../common/types/reaction.type'

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

class ScenarioResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: {
        id: string
    }

}

class GetScenarioResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty({
        type: ScenarioData
    })
    data: ScenarioData

}

class GetScenariosResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty({
        type: Array<ScenarioData>
    })
    data: ScenarioData[]

}

export { ScenarioResDto, GetScenarioResDto, GetScenariosResDto }
