import {Column, CreateDateColumn, Entity} from "typeorm";
import {FileMetadata} from "./file.metadata";

/**
 * @class SharedFile
 * @extends FileMetadata
 * @description This class represents a shared file entity with its metadata
 * This class reflects the database table structure and is used for ORM mapping.
 */
@Entity("shared_file", {schema: "public"})
export class SharedFile extends FileMetadata {
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