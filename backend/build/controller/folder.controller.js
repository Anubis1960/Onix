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
exports.FolderController = void 0;
const logger_config_1 = __importDefault(require("../config/logger.config"));
const folder_service_1 = require("../service/folder.service");
const file_service_1 = require("../service/file.service");
const supabase_service_1 = require("../service/supabase.service");
/**
 * FolderController handles folder-related requests.
 * @class FolderController
 * @param {FolderService} folderService - Instance of FolderService for folder-related operations.
 * @constructor
 * @method getAllFolders - Retrieves all folders.
 * @method getFolderById - Retrieves a folder by its ID.
 * @method createFolder - Creates a new folder instance.
 * @method updateFolder - Updates an existing folder.
 * @method deleteFolder - Deletes a folder.
 * @method getFoldersByUserId - Retrieves folders by user ID.
 */
class FolderController {
    constructor() {
        this.folderService = new folder_service_1.FolderService();
        this.fileService = new file_service_1.FileService();
        this.supabaseService = new supabase_service_1.SupabaseService();
    }
    getAllFolders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const folders = yield this.folderService.getAllFolders();
            res.status(200).json(folders);
        });
    }
    getFolderById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const folderId = req.params.id;
            const folder = yield this.folderService.getFolderById(folderId);
            if (folder === null) {
                res.status(404).json({ message: "Folder not found" });
                return;
            }
            res.status(200).json(folder);
        });
    }
    createFolder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const folderData = req.body;
            if (!folderData.name || !folderData.userId || !folderData.parentId) {
                res.status(400).json({ message: "Name, userId and parentId are required" });
                return;
            }
            logger_config_1.default.info(folderData);
            const newFolder = yield this.folderService.createFolder(folderData);
            if ("status" in newFolder) {
                res.status(newFolder.status).json({ message: newFolder.message });
                return;
            }
            res.status(201).json(newFolder);
        });
    }
    updateFolder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const folderId = req.params.id;
            const updatedData = req.body;
            if (!updatedData.name) {
                res.status(400).json({ message: "Name is required" });
                return;
            }
            const updatedFolder = yield this.folderService.updateFolder(folderId, updatedData);
            if ("status" in updatedFolder) {
                res.status(updatedFolder.status).json({ message: updatedFolder.message });
                return;
            }
            res.status(200).json(updatedFolder);
        });
    }
    deleteFolder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const folderId = req.params.id;
            let foldersTBD = [];
            foldersTBD.push(folderId);
            while (foldersTBD.length > 0) {
                const folderId = foldersTBD.pop();
                if (!folderId) {
                    break;
                }
                const ids = yield this.folderService.getIdsByParentId(folderId);
                if (ids.length > 0) {
                    ids.forEach(id => {
                        foldersTBD.push(id);
                    });
                }
                const paths = yield this.fileService.getStoragePathByParentId(folderId);
                if (paths.length > 0) {
                    paths.forEach(path => {
                        this.supabaseService.deleteFile("vault", path);
                    });
                }
            }
            const deletedFolder = yield this.folderService.deleteFolder(folderId);
            if ("status" in deletedFolder) {
                res.status(deletedFolder.status).json({ message: deletedFolder.message });
                return;
            }
            res.status(200).json(deletedFolder);
        });
    }
    getFoldersByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const folder = yield this.folderService.getFoldersByUserId(userId);
            res.status(200).json(folder);
        });
    }
    getChildrenByParentId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parentId = req.params.parentId;
            const result = {
                files: yield this.fileService.getFilesByFolderId(parentId),
                folders: yield this.folderService.getFoldersByParentId(parentId)
            };
            logger_config_1.default.info(result);
            res.status(200).json(result);
        });
    }
}
exports.FolderController = FolderController;
