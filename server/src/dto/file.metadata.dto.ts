/**
 * @class FileMetadataDto
 * @description Data Transfer Object for file metadata.
 */
export abstract class FileMetadataDto {
    private _id: string;
    private _fileName: string;
    private _fileSize: number;
    private _fileType: string;

    protected constructor(id: string, fileName: string, fileSize: number, fileType: string) {
        this._id = id;
        this._fileName = fileName;
        this._fileSize = fileSize;
        this._fileType = fileType;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get fileName(): string {
        return this._fileName;
    }

    set fileName(value: string) {
        this._fileName = value;
    }

    get fileSize(): number {
        return this._fileSize;
    }

    set fileSize(value: number) {
        this._fileSize = value;
    }

    get fileType(): string {
        return this._fileType;
    }

    set fileType(value: string) {
        this._fileType = value;
    }
}