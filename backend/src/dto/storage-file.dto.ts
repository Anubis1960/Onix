import {FileMetadataDto} from "./file.metadata.dto";

/**
 * @class StorageFileDto
 * @description This class represents a file stored in the system
 * along with its metadata and storage path.
 *
 * @template T - The type of the file metadata.
 * @extends FileMetadataDto - The base class for file metadata.
 */
export class StorageFileDto<T extends FileMetadataDto> {
    public fileDto: T
    public storagePath: string

    constructor(fileDto: T, storagePath: string) {
        this.fileDto = fileDto;
        this.storagePath = storagePath;
    }
}