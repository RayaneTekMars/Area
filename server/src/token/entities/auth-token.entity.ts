import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'
import { Account } from '../../about/accounts/entities/account.entity'
import { EntityType } from '../../common/enums/entity-type.enum'
import { getSecureRandomString } from '../../common/helpers/random.helper'

@Entity()
class AuthToken {

    type = EntityType.AuthToken

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @ManyToOne(
        () => Account,
        (account) => account.authTokens,
        { onDelete: 'CASCADE' }
    )
    @Exclude()
    account: Account

    @Column()
    lastActive: string

    @Column()
    expiresAt: string

    @UpdateDateColumn()
    updatedAt: string

    @CreateDateColumn()
    createdAt: string

    @BeforeInsert()
    beforeInsert() {
        this.id = getSecureRandomString(16)
        this.lastActive = new Date().toISOString()
    }

}

export {
    AuthToken
}
