import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {User} from "./user.entity";
import {File} from "./file.entity";

/**
 * @class Folder
 * @description This class represents a folder entity with its metadata
 * This class reflects the database table structure and is used for ORM mapping.
 */
@Entity("folder", {schema: "public"})
export class Folder {
    @PrimaryColumn({
        name: "folder_id",
        generated: "uuid",
        type: "uuid",
        default: () => "uuid_generate_v4()",
    })
    id: string;

    @Column({
        name: "folder_name",
        type: "varchar",
        nullable: false,
    })
    folderName: string;

    @Column({
        name: "parent_id",
        type: "uuid",
        nullable: true
    })
    parentId: string;

    @Column({
        name: "user_id",
        type: "uuid",
        nullable: false,
    })
    userId: string;

    @ManyToOne((type) => User, (user) => user.folders)
    @JoinColumn({name: "user_id"})
    user: User;

    @OneToMany((type) => Folder, (folder) => folder.parentFolder)
    @JoinColumn({name: "parent_id"})
    subFolders: Folder[];

    @ManyToOne((type) => Folder, (folder) => folder.subFolders)
    @JoinColumn({name: "parent_id"})
    parentFolder: Folder;

    @OneToMany((type) => File, (file) => file.folder)
    @JoinColumn({name: "folder_id"})
    files: File[];

}