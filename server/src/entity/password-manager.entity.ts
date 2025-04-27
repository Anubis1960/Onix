import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {User} from "./user.entity";

/**
 * @class PasswordManager
 * @description This class represents a password manager entity with its metadata
 * This class reflects the database table structure and is used for ORM mapping.
 */
@Entity("password_manager", {schema: "public"})
export class PasswordManager {
    @PrimaryColumn({
        name: "password_id",
        type: "uuid",
        generated: "uuid",
        default: () => "uuid_generate_v4()",
    })
    id: string;

    @Column({
        name: "user_id",
        type: "uuid",
        nullable: false,
        primary: false,
    })
    userId: string;

    @Column({
        name: "domain",
        type: "varchar",
        length: 255,
        nullable: false,
    })
    domain: string;

    @Column({
        name: "username",
        type: "varchar",
        length: 255,
        nullable: false,
    })
    username: string;

    @Column({
        name: "password",
        type: "varchar",
        length: 255,
        nullable: false,
    })
    password: string;

    @ManyToOne((type) => User, (user) => user.passwordManagers)
    @JoinColumn({name: "user_id"})
    user: User;
}