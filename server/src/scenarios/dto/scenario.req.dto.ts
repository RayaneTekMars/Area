import { ApiProperty } from '@nestjs/swagger'
import { Trigger } from '../types/trigger.type'
import { Reaction } from '../types/reaction.type'
import { IsObject, IsString } from 'class-validator'

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
