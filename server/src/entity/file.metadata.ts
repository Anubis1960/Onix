import {Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

export abstract class FileMetadata {
    @PrimaryColumn({
        name: "file_id",
        generated: "uuid",
        type: "uuid",
        default: () => "uuid_generate_v4()",
    })
    id: string;

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