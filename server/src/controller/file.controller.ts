import {Request, Response} from "express";
import logger from "../config/logger.config";
import {FileService} from "../service/file.service";

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
        const newFile = await this.fileService.createFile(fileData);
        if ("status" in newFile) {
            res.status(newFile.status).json({message: newFile.message});
            return;
        }
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

    async getFileByFolderId(req: Request, res: Response) {
        const folderId = req.params.folderId;
        const files = await this.fileService.getFileByFolderId(folderId);
        if ("status" in files) {
            res.status(files.status).json({message: files.message});
            return;
        }
        res.status(200).json(files);
    }

    async uploadFile(req: Request, res: Response) {

    }

    async downloadFile(req: Request, res: Response) {
    }
}