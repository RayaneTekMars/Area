import {
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn
} from 'typeorm'
import { getSecureRandomString } from '../../common/helpers/random.helper'
import { Account } from '../../accounts/entities/account.entity'
import { Reaction } from '../types/reaction.type'
import { Trigger } from '../types/trigger.type'

@Entity()
export class Scenario {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @OneToOne(() => Account)
    @JoinColumn()
    account: Account

    @Column({
        type: 'json',
    })
    trigger: Trigger

    @Column({
        type: 'json',
    })
    reaction: Reaction

    @BeforeInsert()
    beforeInsert() {
        this.id = getSecureRandomString(16)
    }
}
