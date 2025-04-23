import {Request, Response} from "express";
import logger from "../config/logger.config";
import {FileVaultService} from "../service/file-vault.service";

export class FileVaultController {
    private fileVaultService: FileVaultService;

    constructor() {
        this.fileVaultService = new FileVaultService();
    }

    async getAllFiles(req: Request, res: Response) {
        const files = await this.fileVaultService.getAllFiles();
        res.status(200).json(files);
    };

    async getFileById(req: Request, res: Response) {
        const fileId = req.params.id;
        const file = await this.fileVaultService.getFileById(fileId);
        if ("status" in file) {
            res.status(file.status).json({message: file.message});
            return;
        }
        res.status(200).json(file);
    }

    async createFile(req: Request, res: Response) {
        const fileData = req.body;
        if (!fileData.name) {
            res.status(400).json({message: "Name is required"});
            return;
        }
        logger.info(fileData);
        const newFile = await this.fileVaultService.createFile(fileData);
        res.status(201).json(newFile);
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
        const updatedFile = await this.fileVaultService.updateFile(fileId, updateFields);
        if ("status" in updatedFile) {
            res.status(updatedFile.status).json({message: updatedFile.message});
            return;
        }
        res.status(200).json(updatedFile);
    }

    async deleteFile(req: Request, res: Response) {
        const fileId = req.params.id;
        const deletedFile = await this.fileVaultService.deleteFile(fileId);
        if ("status" in deletedFile) {
            res.status(deletedFile.status).json({message: deletedFile.message});
            return;
        }
        res.status(200).json(deletedFile);
    }

    async getFileByUserId(req: Request, res: Response) {
        const userId = req.params.userId;
        const files = await this.fileVaultService.getFileByUserId(userId);
        if ("status" in files) {
            res.status(files.status).json({message: files.message});
            return;
        }
        res.status(200).json(files);
    }
}