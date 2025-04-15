import {Column, PrimaryGeneratedColumn} from "typeorm";

export abstract class FileMetadata {
    @PrimaryGeneratedColumn({
        name: "file_id",
        type: "bigint",
    })
    id: number;

    @Column({
        name: "name",
        type: "varchar",
        length: 255,
    })
    name: string;

    @Column({
        name: "size",
        type: "int",
    })
    size: number;

    @Column({
        name: "path",
        type: "varchar",
        length: 255,
    })
    path: string;
}