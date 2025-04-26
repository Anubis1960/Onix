import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {User} from "./user.entity";
import {File} from "./file.entity";

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
        type: "string",
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