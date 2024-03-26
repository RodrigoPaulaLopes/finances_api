import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusPayment } from "../enums/status-payment.enum"

@Entity('debts')
export class Debt {

    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column({
        nullable: false,
        length: 50,
        unique: true
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

    @Column({nullable: false})
    expiration_date: Date

    @Column({nullable: true})
    payment_date?: Date

    @Column({nullable: true})
    last_payment_date: Date

    @Column({nullable: false})
    installments_number: number

    @Column({nullable: true})
    paidInstallments: number
    
    @Column({
        nullable: false,
        default: "To pay"
    })
    status: StatusPayment

    @CreateDateColumn({
        nullable: false,
        type: 'timestamp',
    })
    createdAt: Date
    @UpdateDateColumn({
        nullable: false,
        type: 'timestamp',
    })
    updatedAt: Date

    @ManyToOne(() => User, (user) => user.debts)
    user: User
}
