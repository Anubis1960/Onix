import {Request, Response} from "express";
import logger from "../config/logger.config";
import {SharedFileService} from "../service/shared-file.service";
import {v4 as uuidv4} from "uuid";
import {SupabaseService} from "../service/supabase.service";

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
    private supabaseService: SupabaseService;

    constructor() {
        this.sharedFileService = new SharedFileService();
        this.supabaseService = new SupabaseService();
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
        if (!req.file) {
            res.status(400).json({message: "File is required"});
            return;
        }
        logger.info(req.file);
        const roomId = uuidv4();
        const fileData = {
            name: req.file.originalname,
            size: req.file.size,
            type: req.file.mimetype,
            downloadsRemaining: req.body.downloadsRemaining,
            timeToLive: req.body.timeToLive,
            roomId: roomId,
        };
        logger.info(fileData);
        if (!fileData.name || !fileData.type || !fileData.downloadsRemaining || !fileData.timeToLive) {
            res.status(400).json({message: "Name and path are required"});
            return;
        }
        const newFile = await this.sharedFileService.createFile(fileData);
        if ("status" in newFile) {
            res.status(newFile.status).json({message: newFile.message});
            return;
        }
        const storagePath = `${roomId}/${newFile.id}/${fileData.name}`;
        const uploadResult = await this.supabaseService.uploadFile("shared", storagePath, req.file.buffer);
        logger.info(uploadResult);
        res.status(201).json(newFile);
    }

    async updateFile(req: Request, res: Response) {
        const fileId = req.params.id;
        const updatedData = req.body;
        if (!updatedData.name) {
            res.status(400).json({message: "Name or path is required"});
            return;
        }
        const updatedFile = await this.sharedFileService.updateFile(fileId, updatedData);
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
        const deleteResult = await this.supabaseService.deleteFile("shared", deletedFile.storagePath);
        logger.info(deleteResult);
        res.status(200).json(deletedFile);
    }

    async downloadFile(req: Request, res: Response) {
    }
}