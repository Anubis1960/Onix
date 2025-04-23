import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany} from "typeorm";
import {FileVault} from "./file-vault.entity";

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
        length: 511,
        nullable: false,
    })
    password: string;

    @OneToMany((type) => FileVault, (file) => file.user)
    files: FileVault[];

    toString() {
        return `User { user_id: ${this.id}, email: ${this.email}`;
    }
}
