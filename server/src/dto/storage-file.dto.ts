import {FileMetadataDto} from "./file.metadata.dto";

export class StorageFileDto<T extends FileMetadataDto> {
    private _fileDto: T
    private _storagePath: string

    constructor(fileDto: T, storagePath: string) {
        this._fileDto = fileDto;
        this._storagePath = storagePath;
    }

    get fileDto(): T {
        return this._fileDto;
    }

    set fileDto(value: T) {
        this._fileDto = value;
    }

    get storagePath(): string {
        return this._storagePath;
    }

    set storagePath(value: string) {
        this._storagePath = value;
    }
}