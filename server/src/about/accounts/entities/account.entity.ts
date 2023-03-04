import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm'
import { EntityType } from '../../../common/enums/entity-type.enum'
import { getSecureRandomString } from '../../../common/helpers/random.helper'
import { AuthToken } from '../../../token/entities/auth-token.entity'

@Entity()
class Account {

    type = EntityType.Account

    @PrimaryColumn()
        id: string

    @Column()
        username: string

    @OneToMany(() => AuthToken, (authToken) => authToken.account)
        authTokens: AuthToken[]

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
    Account
}
