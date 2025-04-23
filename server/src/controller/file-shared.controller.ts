import {Request, Response} from "express";
import logger from "../config/logger.config";
import {FileSharedService} from "../service/file-shared.service";

export class FileSharedController {
    private fileSharedService: FileSharedService;

    constructor() {
        this.fileSharedService = new FileSharedService();
    }

    async getAllFiles(req: Request, res: Response) {
        const files = await this.fileSharedService.getAllFiles();
        res.status(200).json(files);
    };

    async getFileById(req: Request, res: Response) {
        const fileId = req.params.id;
        const file = await this.fileSharedService.getFileById(fileId);
        if ("status" in file) {
            res.status(file.status).json({message: file.message});
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
        const newFile = await this.fileSharedService.createFile(fileData);
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
        const updatedFile = await this.fileSharedService.updateFile(fileId, updateFields);
        if ("status" in updatedFile) {
            res.status(updatedFile.status).json({message: updatedFile.message});
            return;
        }
        res.status(200).json(updatedFile);
    }

    async deleteFile(req: Request, res: Response) {
        const fileId = req.params.id;
        const deletedFile = await this.fileSharedService.deleteFile(fileId);
        if ("status" in deletedFile) {
            res.status(deletedFile.status).json({message: deletedFile.message});
            return;
        }
        res.status(200).json(deletedFile);
    }
}