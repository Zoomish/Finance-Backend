import { User } from 'src/user/entities/user.entity'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @ManyToOne(() => User, (user) => user.categories)
    @JoinColumn({ name: 'user_id' })
    user: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
