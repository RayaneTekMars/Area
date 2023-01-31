import {
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    Unique
} from 'typeorm'
import { getSecureRandomString } from '../../common/helpers/random.helper'
import { Account } from '../../accounts/entities/account.entity'

@Entity()
@Unique(['serviceName', 'account'])
export class Subscription {

    @PrimaryColumn()
    id: string

    @Column()
    serviceName: string

    @ManyToOne(() => Account)
    @JoinColumn()
    account: Account

    @Column()
    accessToken: string

    @Column()
    refreshToken: string

    @Column()
    expiresIn: number

    @BeforeInsert()
    beforeInsert() {
        this.id = getSecureRandomString(16)
    }

}
