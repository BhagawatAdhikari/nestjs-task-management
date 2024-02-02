import { Column, Entity, Exclusion, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "src/auth/user.entity";
import { ExclusionMetadata } from "typeorm/metadata/ExclusionMetadata";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Column({
        length: 40,
    })
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus

    @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
    // @Exclude({ toPlainOnly: true})
    user: User;
}