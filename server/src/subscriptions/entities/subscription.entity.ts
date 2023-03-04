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
import { Account } from '../../about/accounts/entities/account.entity'
import { ServiceName } from '../../common/types/service.type'

@Entity()
@Unique(['serviceName', 'account'])
export class Subscription {

    @PrimaryColumn()
        id: string

    @Column({
        type: 'enum',
        enum: ServiceName
    })
        serviceName: ServiceName

    @ManyToOne(() => Account, (account) => account.id, { eager: true })
    @JoinColumn()
        account: Account

    @Column()
        accessToken: string

    @Column()
        refreshToken: string

    @Column({ type: String, nullable: true })
        expiresAt!: string | null

    @BeforeInsert()
    beforeInsert() {
        this.id = getSecureRandomString(16)
    }

}
