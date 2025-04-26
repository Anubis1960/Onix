import {Request, Response} from "express";
import logger from "../config/logger.config";
import {FileService} from "../service/file.service";

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

    constructor() {
        this.fileService = new FileService();
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
        logger.info(req.file);
        const fileData = {
            name: req.file.originalname,
            size: req.file.size,
            type: req.file.mimetype,
            folderId: req.body.folderId,
            storagePath: req.file.path
        };
    }

    async updateFile(req: Request, res: Response) {
        const fileId = req.params.id;
        const updatedData = req.body;
        if (!updatedData.name) {
            res.status(400).json({message: "Name is required"});
            return;
        }
        const updateFields: { name?: string } = {};
        if (updatedData.name) {
            updateFields.name = updatedData.name;
        }
        const updatedFile = await this.fileService.updateFile(fileId, updateFields);
        if ("status" in updatedFile) {
            res.status(updatedFile.status).json({message: updatedFile.message});
            return;
        }
        res.status(200).json(updatedFile);
    }

    async deleteFile(req: Request, res: Response) {
        const fileId = req.params.id;
        const deletedFile = await this.fileService.deleteFile(fileId);
        if ("status" in deletedFile) {
            res.status(deletedFile.status).json({message: deletedFile.message});
            return;
        }
        res.status(200).json(deletedFile);
    }

    async getFilesByFolderId(req: Request, res: Response) {
        const folderId = req.params.folderId;
        const files = await this.fileService.getFilesByFolderId(folderId);
        res.status(200).json(files);
    }

    async downloadFile(req: Request, res: Response) {
    }
}