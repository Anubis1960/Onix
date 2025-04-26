import {Request, Response} from "express";
import logger from "../config/logger.config";
import {SharedFileService} from "../service/shared-file.service";

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
export class SharedFileController {
    private sharedFileService: SharedFileService;

    constructor() {
        this.sharedFileService = new SharedFileService();
    }

    async getAllFiles(req: Request, res: Response) {
        const files = await this.sharedFileService.getAllFiles();
        res.status(200).json(files);
    };

    async getFileById(req: Request, res: Response) {
        const fileId = req.params.id;
        const file = await this.sharedFileService.getFileById(fileId);
        if (file === null) {
            res.status(404).json({message: "File not found"});
            return;
        }
        res.status(200).json(file);
    }

    async createFile(req: Request, res: Response) {
        const fileData = req.body;
        if (!fileData.name || !fileData.path) {
            res.status(400).json({message: "Name and path are required"});
            return;
        }
        const newFile = await this.sharedFileService.createFile(fileData);
        if ("status" in newFile) {
            res.status(newFile.status).json({message: newFile.message});
            return;
        }
        res.status(201).json(newFile);
    }

    async updateFile(req: Request, res: Response) {
        const fileId = req.params.id;
        const updatedData = req.body;
        if (!updatedData.name && !updatedData.path) {
            res.status(400).json({message: "Name or path is required"});
            return;
        }
        const updateFields: { name?: string } = {};
        if (updatedData.name) {
            updateFields.name = updatedData.name;
        }
        const updatedFile = await this.sharedFileService.updateFile(fileId, updateFields);
        if ("status" in updatedFile) {
            res.status(updatedFile.status).json({message: updatedFile.message});
            return;
        }
        res.status(200).json(updatedFile);
    }

    async deleteFile(req: Request, res: Response) {
        const fileId = req.params.id;
        const deletedFile = await this.sharedFileService.deleteFile(fileId);
        if ("status" in deletedFile) {
            res.status(deletedFile.status).json({message: deletedFile.message});
            return;
        }
        res.status(200).json(deletedFile);
    }

    async uploadFile(req: Request, res: Response) {

    }

    async downloadFile(req: Request, res: Response) {
    }
}