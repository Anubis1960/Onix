import {Entity, Column, PrimaryColumn, OneToMany} from "typeorm";
import {Folder} from "./folder.entity";
import {PasswordManager} from "./password-manager.entity";

/**
 * @class User
 * @description This class represents a user entity with its metadata
 * This class reflects the database table structure and is used for ORM mapping.
 */
@Entity("user", {schema: "public"})
export class User {
    @PrimaryColumn({
        name: "user_id",
        generated: "uuid",
        type: "uuid",
        default: () => "uuid_generate_v4()",
    })
    id: string;

    @Column({
        type: "varchar",
        length: 100,
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        type: "varchar",
        length: 60,
        nullable: false,
    })
    password: string;

    @OneToMany((type) => Folder, (folder) => folder.user)
    folders: Folder[];

    @OneToMany((type) => PasswordManager, (passwordManager) => passwordManager.user)
    passwordManagers: PasswordManager[];

    toString() {
        return `User { user_id: ${this.id}, email: ${this.email}`;
    }
}
