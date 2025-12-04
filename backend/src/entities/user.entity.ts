import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column({ nullable: true })
    hobbies: string;
}
