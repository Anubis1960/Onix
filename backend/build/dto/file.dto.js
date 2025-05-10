"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDto = void 0;
const file_metadata_dto_1 = require("./file.metadata.dto");
/**
 * @class FileDto
 * @extends FileMetadataDto
 * @description Data Transfer Object for file.
 */
class FileDto extends file_metadata_dto_1.FileMetadataDto {
    constructor(id, fileName, fileSize, fileType, folderId) {
        super(id, fileName, fileSize, fileType);
        this.folderId = folderId;
    }
}
exports.FileDto = FileDto;
