import { Debt } from "src/debts/entities/debt.entity"
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column({
        nullable: false,
        length: 30
    })
    name: string

    @Column({
        nullable: false,
        length: 30
    })
    last_name: string

    @Column({
        length: 50,
        nullable: false
    })
    email: string
    @Column({
        length: 100,
        nullable: false
    })
    username: string
    @Column({
        nullable: false
    })
    password: string

    @OneToMany(() => Debt, (depts) => depts.user)
    debts?: Debt[]


    
}
