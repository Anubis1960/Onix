import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "user_id"
    })
    id: number;

    @Column({
        type: "varchar",
        length: 100,
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        type: "varchar",
        nullable: false,
        select: false
    })
    password: string;
}