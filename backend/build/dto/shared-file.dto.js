"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedFileDto = void 0;
const file_metadata_dto_1 = require("./file.metadata.dto");
/**
 * @class SharedFileDto
 * @extends FileMetadataDto
 * @description Data Transfer Object for shared file.
 */
class SharedFileDto extends file_metadata_dto_1.FileMetadataDto {
    constructor(id, fileName, fileSize, fileType, downloadsRemaining, timeToLive, createdAt) {
        super(id, fileName, fileSize, fileType);
        this.downloadsRemaining = downloadsRemaining;
        this.timeToLive = timeToLive;
        this.createdAt = createdAt;
    }
    toString() {
        return `FileSharedDTO { fileName: ${this.fileName}, fileSize: ${this.fileSize}, fileType: ${this.fileType}, downloadsRemaining: ${this.downloadsRemaining}, timeToLive: ${this.timeToLive}, createdAt: ${this.createdAt} }`;
    }
}
exports.SharedFileDto = SharedFileDto;
