import { ApiProperty } from '@nestjs/swagger'
import { TriggerDefinition } from '../../common/types/trigger.type'
import { ReactionDefinition } from '../../common/types/reaction.type'
import { Service } from '../../common/types/service.type'

class GetServicesResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty({
        type: Array<Service>
    })
    data: Service[]

}

class GetServiceResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: Service

}

class GetTriggersResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty({
        type: Array<TriggerDefinition>
    })
    data: TriggerDefinition[]
}

class GetTriggerResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: TriggerDefinition

}

class GetReactionsResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: ReactionDefinition[]

}

class GetReactionResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: ReactionDefinition

}

export { GetServicesResDto, GetServiceResDto, GetTriggersResDto, GetTriggerResDto, GetReactionsResDto, GetReactionResDto }
