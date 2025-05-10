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
exports.SharedFileController = void 0;
const logger_config_1 = __importDefault(require("../config/logger.config"));
const shared_file_service_1 = require("../service/shared-file.service");
const uuid_1 = require("uuid");
const supabase_service_1 = require("../service/supabase.service");
const fs_1 = __importDefault(require("fs"));
/**
 * SharedFileController handles shared file-related requests.
 * @class SharedFileController
 * @param {SharedFileService} sharedFileService - Instance of SharedFileService for shared file-related operations.
 * @constructor
 * @method getAllFiles - Retrieves all shared files.
 * @method getFileById - Retrieves a shared file by its ID.
 * @method createFile - Creates a new shared file instance.
 * @method updateFile - Updates an existing shared file.
 * @method deleteFile - Deletes a shared file.
 * @method uploadFile - Uploads a shared file.
 * @method downloadFile - Downloads a shared file.
 */
class SharedFileController {
    constructor() {
        this.sharedFileService = new shared_file_service_1.SharedFileService();
        this.supabaseService = new supabase_service_1.SupabaseService();
    }
    getAllFiles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.sharedFileService.getAllFiles();
            res.status(200).json(files);
        });
    }
    ;
    getFileById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileId = req.params.id;
            const file = yield this.sharedFileService.getFileById(fileId);
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
            const roomId = (0, uuid_1.v4)();
            const fileData = {
                name: req.file.originalname,
                size: req.file.size,
                type: req.file.mimetype,
                downloadsRemaining: req.body.downloadsRemaining,
                timeToLive: req.body.timeToLive,
                roomId: roomId,
            };
            if (!fileData.name || !fileData.type || !fileData.downloadsRemaining || !fileData.timeToLive) {
                res.status(400).json({ message: "Name and path are required" });
                return;
            }
            const newFile = yield this.sharedFileService.createFile(fileData);
            if ("status" in newFile) {
                res.status(newFile.status).json({ message: newFile.message });
                return;
            }
            const file = req.file;
            let buffer = fs_1.default.readFileSync(file.path);
            const storagePath = `${roomId}/${newFile.id}/${fileData.name}`;
            yield this.supabaseService.uploadFile("shared", storagePath, buffer, fileData.type);
            // remove the file from the local storage
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
    deleteFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileId = req.params.id;
            const deletedFile = yield this.sharedFileService.deleteFile(fileId);
            if ("status" in deletedFile) {
                res.status(deletedFile.status).json({ message: deletedFile.message });
                return;
            }
            logger_config_1.default.info(deletedFile);
            const deleteResult = yield this.supabaseService.deleteFile("shared", deletedFile.storagePath);
            logger_config_1.default.info(deleteResult);
            res.status(200).json(deletedFile.fileDto);
        });
    }
    getFilesByRoomId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomId = req.params.roomId;
            const files = yield this.sharedFileService.getFilesByRoomId(roomId);
            if (files === null) {
                res.status(404).json({ message: "Files not found" });
                return;
            }
            res.status(200).json(files);
        });
    }
    downloadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileId = req.params.id;
            const file = yield this.sharedFileService.getMetadataById(fileId);
            logger_config_1.default.info(file);
            if (file === null) {
                res.status(404).json({ message: "File not found" });
                return;
            }
            if (file.storagePath === undefined) {
                res.status(404).json({ message: "File not found" });
                return;
            }
            if (file.fileName === undefined) {
                yield this.supabaseService.deleteFile("shared", file.storagePath);
                res.status(404).json({ message: "File expired or has reached its download limit" });
                return;
            }
            const dFile = yield this.supabaseService.getFile("shared", file.storagePath);
            if (dFile === null) {
                res.status(404).json({ message: "File not found" });
                return;
            }
            const arrayBuffer = yield dFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            res.setHeader("Content-Disposition", `attachment; filename=${file.fileName}`);
            res.setHeader("Content-Type", file.fileType);
            res.setHeader("Content-Length", buffer.length);
            res.send(buffer);
        });
    }
}
exports.SharedFileController = SharedFileController;
