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
        length: 512,
        nullable: false,
    })
    password: string;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false,
    })
    salt: string;

    toString() {
        return `User { user_id: ${this.id}, email: ${this.email}`;
    }
}