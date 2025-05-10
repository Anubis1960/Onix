export class FolderModel {
    public folderId: string;
    public folderName: string;
    public parentId: string;

    constructor(folderId: string, folderName: string, parentId: string) {
        this.folderId = folderId;
        this.folderName = folderName;
        this.parentId = parentId;
    }

    toString() {
        return `FolderModel { folderId: ${this.folderId}, folderName: ${this.folderName}, parentId: ${this.parentId} }`;
    }
}