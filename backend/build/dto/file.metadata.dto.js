"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileMetadataDto = void 0;
/**
 * @class FileMetadataDto
 * @description Data Transfer Object for file metadata.
 */
class FileMetadataDto {
    constructor(id, fileName, fileSize, fileType) {
        this.id = id;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.fileType = fileType;
    }
}
exports.FileMetadataDto = FileMetadataDto;
