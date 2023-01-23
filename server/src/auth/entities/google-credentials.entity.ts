import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm'
import { Account } from '../../accounts/entities/account.entity'
import { getSecureRandomString } from '../../common/helpers/random.helper'

@Entity()
class GoogleCredentials {

    @PrimaryColumn()
    id: string

    @Column()
    googleId: string

    @OneToOne(() => Account, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    account: Account

    @UpdateDateColumn()
    updatedAt: string

    @CreateDateColumn()
    createdAt: string

    @BeforeInsert()
    beforeInsert() {
        this.id = getSecureRandomString(16)
    }

}

export {
    GoogleCredentials
}
