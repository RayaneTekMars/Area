import bcrypt from 'bcrypt'
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
class LocalCredentials {

    @PrimaryColumn()
    id: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToOne(
        () => Account,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn()
    account: Account

    @UpdateDateColumn()
    updatedAt: string

    @CreateDateColumn()
    createdAt: string

    @BeforeInsert()
    async beforeInsert() {
        this.id = getSecureRandomString(16)
        this.password = await bcrypt.hash(this.password, 12)
    }

}

export {
    LocalCredentials
}
