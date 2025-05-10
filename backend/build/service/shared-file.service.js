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
exports.SharedFileService = void 0;
const logger_config_1 = __importDefault(require("../config/logger.config"));
const shared_file_repository_1 = require("../repository/shared-file.repository");
const shared_file_dto_1 = require("../dto/shared-file.dto");
const uuid_1 = require("uuid");
const storage_file_dto_1 = require("../dto/storage-file.dto");
/**
 * @class SharedFileService
 * @description This class provides methods to manage shared files.
 * @method getAllFiles - Retrieves all shared files.
 * @method getFileById - Retrieves a shared file by its ID.
 * @method createFile - Creates a new shared file.
 * @method updateFile - Updates an existing shared file.
 * @method deleteFile - Deletes a shared file.
 */
class SharedFileService {
    getAllFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            let files = yield shared_file_repository_1.SharedFileRepository.findAll();
            if (!files) {
                logger_config_1.default.info("No files found");
                return [];
            }
            return files.map(file => {
                return new shared_file_dto_1.SharedFileDto(file.id, file.fileName, file.fileSize, file.fileType, file.downloadsRemaining, file.timeToLive, file.createdAt);
            });
        });
    }
    getFileById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield shared_file_repository_1.SharedFileRepository.findById(id);
            if (!file) {
                logger_config_1.default.info("File not found for ID:", id);
                return null;
            }
            if (file.createdAt.getTime() + file.timeToLive * 3600 * 1000 < new Date().getTime()) {
                logger_config_1.default.info("File expired for ID:", id);
                return null;
            }
            if (file.downloadsRemaining <= 0) {
                logger_config_1.default.info("File downloads remaining for ID:", id);
                return null;
            }
            logger_config_1.default.info(file.toString());
            return new shared_file_dto_1.SharedFileDto(file.id, file.fileName, file.fileSize, file.fileType, file.downloadsRemaining, file.timeToLive, file.createdAt);
        });
    }
    createFile(fileData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, size, type, downloadsRemaining, timeToLive, roomId } = fileData;
            const id = (0, uuid_1.v4)();
            const storagePath = `${roomId}/${id}/${name}`;
            const newFile = yield shared_file_repository_1.SharedFileRepository
                .createFileShared(id, name, size, type, storagePath, roomId, downloadsRemaining, timeToLive);
            if (!newFile) {
                return { status: 409, message: "Error creating file" };
            }
            return new shared_file_dto_1.SharedFileDto(newFile.id, newFile.fileName, newFile.fileSize, newFile.fileType, newFile.downloadsRemaining, newFile.timeToLive, newFile.createdAt);
        });
    }
    deleteFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield shared_file_repository_1.SharedFileRepository.findById(id);
            if (!file) {
                return { status: 404, message: "File not found" };
            }
            yield shared_file_repository_1.SharedFileRepository.deleteFileShared(id);
            return new storage_file_dto_1.StorageFileDto(new shared_file_dto_1.SharedFileDto(file.id, file.fileName, file.fileSize, file.fileType, file.downloadsRemaining, file.timeToLive, file.createdAt), file.storagePath);
        });
    }
    getFilesByRoomId(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield shared_file_repository_1.SharedFileRepository.findByRoomId(roomId);
            if (!files) {
                logger_config_1.default.info("No files found for room ID:", roomId);
                return [];
            }
            if (files[0].createdAt.getTime() + files[0].timeToLive * 3600 * 1000 < new Date().getTime()) {
                logger_config_1.default.info("File expired for room ID:", roomId);
                return [];
            }
            if (files[0].downloadsRemaining <= 0) {
                logger_config_1.default.info("File downloads remaining for room ID:", roomId);
                return [];
            }
            return files.map(file => {
                return new shared_file_dto_1.SharedFileDto(file.id, file.fileName, file.fileSize, file.fileType, file.downloadsRemaining, file.timeToLive, file.createdAt);
            });
        });
    }
    getMetadataById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield shared_file_repository_1.SharedFileRepository.findById(id);
            if (!file) {
                logger_config_1.default.info("No files found for folder ID:", id);
                return {};
            }
            if (file.createdAt.getTime() + file.timeToLive * 3600 * 1000 < new Date().getTime()) {
                logger_config_1.default.info("File expired for ID:", id);
                return {
                    storagePath: file.storagePath,
                };
            }
            if (file.downloadsRemaining <= 0) {
                logger_config_1.default.info("File downloads remaining for ID:", id);
                return {
                    storagePath: file.storagePath,
                };
            }
            yield shared_file_repository_1.SharedFileRepository.update(id, {
                downloadsRemaining: file.downloadsRemaining - 1,
            });
            return {
                storagePath: file.storagePath,
                fileName: file.fileName,
                fileSize: file.fileSize,
                fileType: file.fileType,
            };
        });
    }
}
exports.SharedFileService = SharedFileService;
