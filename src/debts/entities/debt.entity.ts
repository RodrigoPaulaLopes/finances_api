import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StatusPayment } from "../enums/status-payment.enum"
@Entity('debts')
export class Debt {

    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column({
        nullable: false,
        length: 50
    })
    name: string

    @Column({
        nullable: true,
        type: 'text'
    })
    description: string

    @Column({
        nullable: false
    })
    value: number

    @Column({
        nullable: false,
    })
    status: StatusPayment

    @ManyToOne(() => User, (user) => user.debts)
    user: User
}
