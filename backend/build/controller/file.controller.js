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
exports.FileController = void 0;
const logger_config_1 = __importDefault(require("../config/logger.config"));
const file_service_1 = require("../service/file.service");
const supabase_service_1 = require("../service/supabase.service");
const fs_1 = __importDefault(require("fs"));
/**
 * FileController handles file-related requests.
 * @class FileController
 * @param {FileService} fileService - Instance of FileService for file-related operations.
 * @constructor
 * @method getAllFiles - Retrieves all files.
 * @method getFileById - Retrieves a file by its ID.
 * @method createFile - Creates a new file instance.
 * @method updateFile - Updates an existing file.
 * @method deleteFile - Deletes a file.
 * @method getFilesByFolderId - Retrieves files by folder ID.
 * @method uploadFile - Uploads a file.
 * @method downloadFile - Downloads a file.
 **/
class FileController {
    constructor() {
        this.fileService = new file_service_1.FileService();
        this.supabaseService = new supabase_service_1.SupabaseService();
    }
    getAllFiles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.fileService.getAllFiles();
            res.status(200).json(files);
        });
    }
    ;
    getFileById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileId = req.params.id;
            const file = yield this.fileService.getFileById(fileId);
            if (file === null) {
                res.status(404).json({ message: "File not found" });
                return;
            }
            res.status(200).json(file);
        });
    }
    createFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                res.status(400).json({ message: "File is required" });
                return;
            }
            const fileData = {
                name: req.file.originalname,
                size: req.file.size,
                type: req.file.mimetype,
                folderId: req.body.folderId,
                userId: req.body.userId,
            };
            if (!fileData.name || !fileData.type || !fileData.folderId || !fileData.userId) {
                res.status(400).json({ message: "Name, size, type, folderId and userId are required" });
                return;
            }
            const newFile = yield this.fileService.createFile(fileData);
            if ("status" in newFile) {
                res.status(newFile.status).json({ message: newFile.message });
                return;
            }
            const file = req.file;
            let buffer = fs_1.default.readFileSync(file.path);
            const storagePath = `${fileData.userId}/${newFile.id}/${fileData.name}`;
            yield this.supabaseService.uploadFile("vault", storagePath, buffer, fileData.type);
            const filePath = req.file.path;
            fs_1.default.unlink(filePath, (err) => {
                if (err) {
                    logger_config_1.default.error("Error deleting file:", err);
                }
                else {
                    logger_config_1.default.info("File deleted successfully");
                }
            });
            res.status(201).json(newFile);
        });
    }
    updateFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileId = req.params.id;
            const updatedData = req.body;
            if (!updatedData) {
                res.status(400).json({ message: "Fields are required" });
                return;
            }
            const updatedFile = yield this.fileService.updateFile(fileId, updatedData);
            if ("status" in updatedFile) {
                res.status(updatedFile.status).json({ message: updatedFile.message });
                return;
            }
            const fileDto = updatedFile.fileDto;
            const oldStoragePath = updatedFile.storagePath;
            const newStoragePath = updatedFile.storagePath.split("/").slice(0, -1).join("/") + "/" + fileDto.fileName;
            const uploadResult = yield this.supabaseService.moveFile("vault", oldStoragePath, newStoragePath);
            logger_config_1.default.info(uploadResult);
            res.status(200).json(updatedFile.fileDto);
        });
    }
    deleteFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileId = req.params.id;
            const deletedFile = yield this.fileService.deleteFile(fileId);
            if ("status" in deletedFile) {
                res.status(deletedFile.status).json({ message: deletedFile.message });
                return;
            }
            const deleteResult = yield this.supabaseService.deleteFile("vault", deletedFile.storagePath);
            logger_config_1.default.info(deleteResult);
            res.status(200).json(deletedFile.fileDto);
        });
    }
    getFilesByFolderId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const folderId = req.params.folderId;
            const files = yield this.fileService.getFilesByFolderId(folderId);
            res.status(200).json(files);
        });
    }
    downloadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileId = req.params.id;
            const file = yield this.fileService.getMetadataById(fileId);
            if (file.storagePath === undefined || file.fileSize === undefined || file.fileType === undefined) {
                res.status(404).json({ message: "File not found" });
                return;
            }
            const dfile = yield this.supabaseService.getFile("vault", file.storagePath);
            if (dfile === null) {
                res.status(404).json({ message: "File not found" });
                return;
            }
            const arrayBuffer = yield dfile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            res.setHeader("Content-Disposition", `attachment; filename=${file.fileName}`);
            res.setHeader("Content-Type", file.fileType);
            res.setHeader("Content-Length", buffer.length);
            res.send(buffer);
        });
    }
}
exports.FileController = FileController;
