import { ApiProperty } from '@nestjs/swagger'
import { IsObject, IsString } from 'class-validator'
import { Trigger } from '../../common/types/trigger.type'
import { Reaction } from '../../common/types/reaction.type'

export class ScenarioReqDto {

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsObject()
    trigger: Trigger

    @ApiProperty()
    @IsObject()
    reaction: Reaction

}
