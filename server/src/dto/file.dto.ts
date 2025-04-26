import {FileMetadataDto} from "./file.metadata.dto";

/**
 * @class FileDto
 * @extends FileMetadataDto
 * @description Data Transfer Object for file.
 */
export class FileDto extends FileMetadataDto {
    private _folderId: string;

    constructor(fileName: string, fileSize: number, fileType: string, folderId: string) {
        super(fileName, fileSize, fileType);
        this._folderId = folderId;
    }

    get folderId(): string {
        return this._folderId;
    }

    set folderId(value: string) {
        this._folderId = value;
    }
}