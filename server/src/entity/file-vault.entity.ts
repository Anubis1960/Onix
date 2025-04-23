import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FileMetadata} from "./file.metadata";
import {User} from "./user.entity";

@Entity("file_vault", {schema: "public"})
export class FileVault extends FileMetadata {
    @Column({
        name: "user_id",
        type: "uuid",
        nullable: false,
        primary: false,
    })
    userId: string;

    @ManyToOne((type) => User, (user) => user.files)
    @JoinColumn({name: "user_id"})
    user: User;
}