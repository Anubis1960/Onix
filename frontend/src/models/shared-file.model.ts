import {FileMetadataModel} from "./file-metadata.model.ts";

export class SharedFileModel extends FileMetadataModel {
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
        return `SharedFileModel { fileName: ${this.fileName}, fileSize: ${this.fileSize}, fileType: ${this.fileType}, downloadsRemaining: ${this.downloadsRemaining}, timeToLive: ${this.timeToLive}, createdAt: ${this.createdAt} }`;
    }
}