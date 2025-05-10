/**
 * @class FolderDto
 * @description Data Transfer Object for Folder
 */
export class FolderDto {
    public folderId: string;
    public folderName: string;
    public parentId: string;

    constructor(folderId: string, folderName: string, parentId: string) {
        this.folderId = folderId;
        this.folderName = folderName;
        this.parentId = parentId;
    }
}