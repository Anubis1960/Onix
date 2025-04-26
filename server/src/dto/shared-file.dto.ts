import {FileMetadataDto} from "./file.metadata.dto";

/**
 * @class SharedFileDto
 * @extends FileMetadataDto
 * @description Data Transfer Object for shared file.
 */
export class SharedFileDto extends FileMetadataDto {
    private _downloadsRemaining: number;
    private _timeToLive: number;
    private _createdAt: Date;

    constructor(fileName: string, fileSize: number, fileType: string, downloadsRemaining: number, timeToLive: number, createdAt: Date) {
        super(fileName, fileSize, fileType);
        this._downloadsRemaining = downloadsRemaining;
        this._timeToLive = timeToLive;
        this._createdAt = createdAt;
    }

    get downloadsRemaining(): number {
        return this._downloadsRemaining;
    }

    set downloadsRemaining(value: number) {
        this._downloadsRemaining = value;
    }

    get timeToLive(): number {
        return this._timeToLive;
    }

    set timeToLive(value: number) {
        this._timeToLive = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    toString(): string {
        return `FileSharedDTO { fileName: ${this.fileName}, fileSize: ${this.fileSize}, fileType: ${this.fileType}, downloadsRemaining: ${this.downloadsRemaining}, timeToLive: ${this.timeToLive}, createdAt: ${this.createdAt} }`;
    }
}