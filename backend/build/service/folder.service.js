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
exports.FolderService = void 0;
const logger_config_1 = __importDefault(require("../config/logger.config"));
const folder_repository_1 = require("../repository/folder.repository");
const folder_dto_1 = require("../dto/folder.dto");
const user_repository_1 = require("../repository/user.repository");
/**
 * @class FolderService
 * @description This class provides methods to manage folders in the file vault application.
 * @method getAllFolders - Retrieves all folders from the database.
 * @method getFolderById - Retrieves a folder by its ID.
 * @method createFolder - Creates a new folder.
 * @method updateFolder - Updates an existing folder.
 * @method deleteFolder - Deletes a folder.
 * @method getFoldersByUserId - Retrieves folders by user ID.
 */
class FolderService {
    getAllFolders() {
        return __awaiter(this, void 0, void 0, function* () {
            let folders = yield folder_repository_1.FolderRepository.findAll();
            if (!folders) {
                logger_config_1.default.info("No folders found");
                return [];
            }
            return folders.map(folder => {
                return new folder_dto_1.FolderDto(folder.id, folder.folderName, folder.parentId);
            });
        });
    }
    getFolderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const folder = yield folder_repository_1.FolderRepository.findById(id);
            if (!folder) {
                logger_config_1.default.info("Folder not found for ID:", id);
                return null;
            }
            logger_config_1.default.info(folder.toString());
            return new folder_dto_1.FolderDto(folder.id, folder.folderName, folder.parentId);
        });
    }
    createFolder(folderData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, parentId, userId } = folderData;
            if (parentId) {
                const parentFolder = yield folder_repository_1.FolderRepository.findById(parentId);
                if (!parentFolder) {
                    return { status: 404, message: "Parent folder not found" };
                }
            }
            const user = yield user_repository_1.UserRepository.findById(userId);
            if (!user) {
                return { status: 404, message: "User not found" };
            }
            const folder = yield folder_repository_1.FolderRepository.createFolder(name, parentId, userId);
            if (!folder) {
                return { status: 500, message: "Folder creation failed" };
            }
            return new folder_dto_1.FolderDto(folder.id, folder.folderName, folder.parentId);
        });
    }
    updateFolder(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const folder = yield folder_repository_1.FolderRepository.findById(id);
            if (!folder) {
                return { status: 404, message: "Folder not found" };
            }
            let partialFolder = {
                folderName: updatedData.name,
                parentId: updatedData.parentId,
            };
            yield folder_repository_1.FolderRepository.updateFolder(id, partialFolder);
            return new folder_dto_1.FolderDto(folder.id, partialFolder.folderName || folder.folderName, partialFolder.parentId || folder.parentId);
        });
    }
    deleteFolder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const folder = yield folder_repository_1.FolderRepository.findById(id);
            if (!folder) {
                return { status: 404, message: "Folder not found" };
            }
            const deletedFolder = yield folder_repository_1.FolderRepository.deleteFolder(id);
            if (!deletedFolder) {
                return { status: 500, message: "Failed to delete folder" };
            }
            return { status: 200, message: "Folder deleted successfully" };
        });
    }
    getFoldersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const folders = yield folder_repository_1.FolderRepository.findByUserId(userId);
            if (!folders) {
                logger_config_1.default.info("No folders found for user ID:", userId);
                return [];
            }
            return folders.map(folder => {
                return new folder_dto_1.FolderDto(folder.id, folder.folderName, folder.parentId);
            });
        });
    }
    getFoldersByParentId(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const folders = yield folder_repository_1.FolderRepository.findByParentId(parentId);
            if (!folders) {
                logger_config_1.default.info("No folders found for parent ID:", parentId);
                return [];
            }
            logger_config_1.default.info(folders);
            return folders.map(folder => {
                return new folder_dto_1.FolderDto(folder.id, folder.folderName, folder.parentId);
            });
        });
    }
    getIdsByParentId(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const folders = yield folder_repository_1.FolderRepository.findFolderIdsByParentId(parentId);
            if (!folders) {
                logger_config_1.default.info("No folders found for parent ID:", parentId);
                return [];
            }
            logger_config_1.default.info(folders);
            return folders.map(folder => {
                return folder.id;
            });
        });
    }
    getFoldersIdsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const folders = yield folder_repository_1.FolderRepository.findFolderIdsByUserId(userId);
            if (!folders) {
                logger_config_1.default.info("No folders found for user ID:", userId);
                return [];
            }
            return folders.map(folder => {
                return folder.id;
            });
        });
    }
}
exports.FolderService = FolderService;
