import {Column, CreateDateColumn, Entity} from "typeorm";
import {FileMetadata} from "./file.metadata";

@Entity("file_shared", {schema: "public"})
export class FileShared extends FileMetadata {
    @Column({
        name: "downloads_remaining",
        type: "int2",
        nullable: false
    })
    downloadsRemaining: number;

    @Column({
        name: "time_to_live",
        type: "int2",
        nullable: false
    })
    timeToLive: number;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
        default: Date.now(),
        nullable: false
    })
    createdAt: Date;
}