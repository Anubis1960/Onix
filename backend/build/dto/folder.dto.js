"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderDto = void 0;
/**
 * @class FolderDto
 * @description Data Transfer Object for Folder
 */
class FolderDto {
    constructor(folderId, folderName, parentId) {
        this.folderId = folderId;
        this.folderName = folderName;
        this.parentId = parentId;
    }
}
exports.FolderDto = FolderDto;
