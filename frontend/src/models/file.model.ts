import {FileMetadataModel} from "./file-metadata.model.ts";

export class FileModel extends FileMetadataModel {
    public folderId: string;

    constructor(id: string, fileName: string, fileSize: number, fileType: string, folderId: string) {
        super(id, fileName, fileSize, fileType);
        this.folderId = folderId;
    }
}