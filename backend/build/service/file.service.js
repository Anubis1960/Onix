"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const logger_config_1 = __importDefault(require("../config/logger.config"));
const file_repository_1 = require("../repository/file.repository");
const file_dto_1 = require("../dto/file.dto");
const uuid_1 = require("uuid");
const storage_file_dto_1 = require("../dto/storage-file.dto");
/**
 * @class FileService
 * @description This class handles file-related operations.
 * @method getAllFiles - Retrieves all files.
 * @method getFileById - Retrieves a file by its ID.
 * @method createFile - Creates a new file.
 * @method updateFile - Updates an existing file.
 * @method deleteFile - Deletes a file.
 * @method getFilesByFolderId - Retrieves files by folder ID.
 */
class FileService {
    getAllFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            let files = yield file_repository_1.FileRepository.findAll();
            logger_config_1.default.info(files);
            if (!files) {
                logger_config_1.default.info("No files found");
                return [];
            }
            return files.map(file => {
                return new file_dto_1.FileDto(file.id, file.fileName, file.fileSize, file.fileType, file.folderId);
            });
        });
    }
    getFileById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield file_repository_1.FileRepository.findById(id);
            if (!file) {
                return null;
            }
            logger_config_1.default.info(file.toString());
            return new file_dto_1.FileDto(file.id, file.fileName, file.fileSize, file.fileType, file.folderId);
        });
    }
    createFile(fileData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, size, type, folderId, userId } = fileData;
            const id = (0, uuid_1.v4)();
            const storagePath = `${userId}/${id}/${name}`;
            const file = yield file_repository_1.FileRepository.createFile(id, name, size, type, storagePath, folderId);
            logger_config_1.default.info(file);
            if (!file) {
                return { status: 500, message: "File creation failed" };
            }
            return new file_dto_1.FileDto(file.id, file.fileName, file.fileSize, file.fileType, file.folderId);
        });
    }
    updateFile(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield file_repository_1.FileRepository.findById(id);
            if (!file) {
                return { status: 404, message: "File not found" };
            }
            let partialFile = {
                fileName: updatedData.name,
                folderId: updatedData.folderId,
            };
            if (updatedData) {
                partialFile.storagePath = file.storagePath.split("/").slice(0, -1).join("/") + "/" + updatedData.name;
            }
            yield file_repository_1.FileRepository.updateFile(id, partialFile);
            return new storage_file_dto_1.StorageFileDto(new file_dto_1.FileDto(file.id, partialFile.fileName || file.fileName, file.fileSize, file.fileType, partialFile.folderId || file.folderId), partialFile.storagePath || file.storagePath);
        });
    }
    deleteFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield file_repository_1.FileRepository.findById(id);
            if (!file) {
                return { status: 404, message: "File not found" };
            }
            yield file_repository_1.FileRepository.deleteFile(id);
            return new storage_file_dto_1.StorageFileDto(new file_dto_1.FileDto(file.id, file.fileName, file.fileSize, file.fileType, file.folderId), file.storagePath);
        });
    }
    getFilesByFolderId(folderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield file_repository_1.FileRepository.findByFolderId(folderId);
            if (!files) {
                logger_config_1.default.info("No files found for folder ID:", folderId);
                return [];
            }
            return files.map(file => {
                return new file_dto_1.FileDto(file.id, file.fileName, file.fileSize, file.fileType, file.folderId);
            });
        });
    }
    getStoragePathByParentId(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield file_repository_1.FileRepository.findByFolderId(parentId);
            if (!files) {
                logger_config_1.default.info("No files found for folder ID:", parentId);
                return [];
            }
            return files.map(file => {
                return file.storagePath;
            });
        });
    }
    getMetadataById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield file_repository_1.FileRepository.findById(id);
            if (!file) {
                logger_config_1.default.info("No files found for folder ID:", id);
                return {};
            }
            return {
                storagePath: file.storagePath,
                fileName: file.fileName,
                fileSize: file.fileSize,
                fileType: file.fileType,
            };
        });
    }
}
exports.FileService = FileService;
