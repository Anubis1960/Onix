import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FileMetadata} from "./file.metadata";

@Entity("file_vault", {schema: "public"})
export class FileVault extends FileMetadata {
    @Column({
        type: "int",
        name: "user_id",
        nullable: false
    })
    @OneToMany(type => FileVault, file => file.userId)
    userId: number;
}