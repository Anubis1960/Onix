import {Request, Response} from "express";
import logger from "../config/logger.config";
import {FileService} from "../service/file.service";
import {SupabaseService} from "../service/supabase.service";
import fs from "fs";
import {FolderService} from "../service/folder.service";
import {FileDto} from "../dto/file.dto";

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
export class FileController {
    private fileService: FileService;
    private supabaseService: SupabaseService;

    constructor() {
        this.fileService = new FileService();
        this.supabaseService = new SupabaseService();
    }

    async getAllFiles(req: Request, res: Response) {
        const files = await this.fileService.getAllFiles();
        res.status(200).json(files);
    };

    async getFileById(req: Request, res: Response) {
        const fileId = req.params.id;
        const file = await this.fileService.getFileById(fileId);
        if (file === null) {
            res.status(404).json({message: "File not found"});
            return;
        }
        res.status(200).json(file);
    }

    async createFile(req: Request, res: Response) {
        if (!req.file) {
            res.status(400).json({message: "File is required"});
            return;
        }

        const fileData = {
            name: req.file.originalname,
            size: req.file.size,
            type: req.file.mimetype,
            folderId: req.body.folderId,
            userId: req.body.userId,
        };
        logger.info(fileData);

        if (!fileData.name || !fileData.type || !fileData.folderId || !fileData.userId) {
            res.status(400).json({message: "Name, size, type, folderId and userId are required"});
            return;
        }
        const newFile = await this.fileService.createFile(fileData);

        if ("status" in newFile) {
            res.status(newFile.status).json({message: newFile.message});
            return;
        }

        const storagePath = `${fileData.userId}/${newFile.id}/${fileData.name}`;
        const uploadResult = await this.supabaseService.uploadFile("vault", storagePath, req.file.buffer);
        logger.info(uploadResult);

        // remove the file from the local storage
        const filePath = req.file.path;
        fs.unlink(filePath, (err: any) => {
            if (err) {
                logger.error("Error deleting file:", err);
            } else {
                logger.info("File deleted successfully");
            }
        });
        res.status(201).json(newFile);
    }

    async updateFile(req: Request, res: Response) {
        const fileId = req.params.id;
        const updatedData = req.body;
        if (!updatedData) {
            res.status(400).json({message: "Fields are required"});
            return;
        }
        const updatedFile = await this.fileService.updateFile(fileId, updatedData);
        if ("status" in updatedFile) {
            res.status(updatedFile.status).json({message: updatedFile.message});
            return;
        }
        const fileDto: FileDto = updatedFile.fileDto;
        const oldStoragePath = updatedFile.storagePath;
        const newStoragePath = updatedFile.storagePath.split("/").slice(0, -1).join("/") + "/" + fileDto.fileName;
        const uploadResult = await this.supabaseService.moveFile("vault", oldStoragePath, newStoragePath);
        logger.info(uploadResult);
        res.status(200).json(updatedFile.fileDto);
    }

    async deleteFile(req: Request, res: Response) {
        const fileId = req.params.id;
        const deletedFile = await this.fileService.deleteFile(fileId);
        if ("status" in deletedFile) {
            res.status(deletedFile.status).json({message: deletedFile.message});
            return;
        }
        const deleteResult = await this.supabaseService.deleteFile("vault", deletedFile.storagePath);
        logger.info(deleteResult);
        res.status(200).json(deletedFile.fileDto);
    }

    async getFilesByFolderId(req: Request, res: Response) {
        const folderId = req.params.folderId;
        const files = await this.fileService.getFilesByFolderId(folderId);
        res.status(200).json(files);
    }

    async downloadFile(req: Request, res: Response) {
        // TODO: Implement file download logic
    }
}