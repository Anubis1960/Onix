import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {FileMetadata} from "./file.metadata";
import {Folder} from "./folder.entity";

/**
 * @class File
 * @extends FileMetadata
 * @description This class represents a file entity with its metadata and folder ID
 * This class reflects the database table structure and is used for ORM mapping.
 */
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