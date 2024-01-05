import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

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
}