import {FileMetadataDto} from "./file.metadata.dto";

/**
 * @class SharedFileDto
 * @extends FileMetadataDto
 * @description Data Transfer Object for shared file.
 */
export class SharedFileDto extends FileMetadataDto {
    public downloadsRemaining: number;
    public timeToLive: number;
    public createdAt: Date;

    constructor(id: string, fileName: string, fileSize: number, fileType: string, downloadsRemaining: number, timeToLive: number, createdAt: Date) {
        super(id, fileName, fileSize, fileType);
        this.downloadsRemaining = downloadsRemaining;
        this.timeToLive = timeToLive;
        this.createdAt = createdAt;
    }

    toString(): string {
        return `FileSharedDTO { fileName: ${this.fileName}, fileSize: ${this.fileSize}, fileType: ${this.fileType}, downloadsRemaining: ${this.downloadsRemaining}, timeToLive: ${this.timeToLive}, createdAt: ${this.createdAt} }`;
    }
}