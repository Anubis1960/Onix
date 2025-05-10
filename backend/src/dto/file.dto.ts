import {FileMetadataDto} from "./file.metadata.dto";

/**
 * @class FileDto
 * @extends FileMetadataDto
 * @description Data Transfer Object for file.
 */
export class FileDto extends FileMetadataDto {
    public folderId: string;

    constructor(id: string, fileName: string, fileSize: number, fileType: string, folderId: string) {
        super(id, fileName, fileSize, fileType);
        this.folderId = folderId;
    }
}