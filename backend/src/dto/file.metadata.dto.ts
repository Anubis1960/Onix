/**
 * @class FileMetadataDto
 * @description Data Transfer Object for file metadata.
 */
export abstract class FileMetadataDto {
    public id: string;
    public fileName: string;
    public fileSize: number;
    public fileType: string;

    protected constructor(id: string, fileName: string, fileSize: number, fileType: string) {
        this.id = id;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.fileType = fileType;
    }
}