import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";

/**
 * @class PasswordManager
 * @description This class represents a password manager entity with its metadata
 * This class reflects the database table structure and is used for ORM mapping.
 */
@Entity("password_manager", {schema: "public"})
export class PasswordManager {
    @PrimaryColumn({
        name: "pass_id",
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
    @OneToMany(type => PasswordManager, password => password.userId)
    userId: string;

    @Column({
        name: "name",
        type: "varchar",
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        name: "password",
        type: "varchar",
        length: 511,
        nullable: false,
    })
    password: string;
}