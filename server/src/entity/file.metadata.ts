import {Column, PrimaryColumn} from "typeorm";

export abstract class FileMetadata {
    @PrimaryColumn({
        name: "file_id",
        generated: "uuid",
        type: "uuid",
        default: () => "uuid_generate_v4()",
    })
    id: string;

    @Column({
        name: "file_name",
        type: "varchar",
        length: 255,
    })
    fileName: string;

    @Column({
        name: "file_size",
        type: "int",
    })
    fileSize: number;

    @Column({
        name: "file_type",
        type: "varchar",
        length: 100,
    })
    fileType: string;

    @Column({
        name: "storage_path",
        type: "varchar",
        length: 255,
    })
    storagePath: string;
}