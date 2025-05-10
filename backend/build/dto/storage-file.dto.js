"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageFileDto = void 0;
/**
 * @class StorageFileDto
 * @description This class represents a file stored in the system
 * along with its metadata and storage path.
 *
 * @template T - The type of the file metadata.
 * @extends FileMetadataDto - The base class for file metadata.
 */
class StorageFileDto {
    constructor(fileDto, storagePath) {
        this.fileDto = fileDto;
        this.storagePath = storagePath;
    }
}
exports.StorageFileDto = StorageFileDto;
