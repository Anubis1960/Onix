/**
 * @class FolderDto
 * @description Data Transfer Object for Folder
 */
export class FolderDto {
    private _folderId: string;
    private _folderName: string;
    private _parentId: string;

    constructor(folderId: string, folderName: string, parentId: string) {
        this._folderId = folderId;
        this._folderName = folderName;
        this._parentId = parentId;
    }

    get folderId(): string {
        return this._folderId;
    }

    set folderId(value: string) {
        this._folderId = value;
    }

    get folderName(): string {
        return this._folderName;
    }

    set folderName(value: string) {
        this._folderName = value;
    }

    get parentId(): string {
        return this._parentId;
    }

    set parentId(value: string) {
        this._parentId = value;
    }
}