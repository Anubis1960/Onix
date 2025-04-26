import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FileMetadata} from "./file.metadata";
import {User} from "./user.entity";
import {Folder} from "./folder.entity";

@Entity("file", {schema: "public"})
export class File extends FileMetadata {
    @Column({
        name: "folder_id",
        type: "uuid",
        nullable: false,
    })
    folderId: string;

    @ManyToOne((type) => Folder, (folder) => folder.files)
    @JoinColumn({name: "folder_id"})
    folder: Folder;
}