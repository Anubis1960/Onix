import {Request, Response} from "express";
import logger from "../config/logger.config";
import {FolderService} from "../service/folder.service";

export class FolderController {
    private folderService: FolderService;

    constructor() {
        this.folderService = new FolderService();
    }

    async getAllFolders(req: Request, res: Response) {
        const folders = await this.folderService.getAllFolders();
        res.status(200).json(folders);
    };

    async getFolderById(req: Request, res: Response) {
        const folderId = req.params.id;
        const folder = await this.folderService.getFolderById(folderId);
        if ("status" in folder) {
            res.status(folder.status).json({message: folder.message});
            return;
        }
        res.status(200).json(folder);
    }

    async createFolder(req: Request, res: Response) {
        const folderData = req.body;
        if (!folderData.name) {
            res.status(400).json({message: "Name is required"});
            return;
        }
        logger.info(folderData);
        const newFolder = await this.folderService.createFolder(folderData);
        res.status(201).json(newFolder);
    }

    async updateFolder(req: Request, res: Response) {
        const folderId = req.params.id;
        const updatedData = req.body;
        if (!updatedData.name) {
            res.status(400).json({message: "Name is required"});
            return;
        }
        const updateFields: { name?: string } = {};
        if (updatedData.name) {
            updateFields.name = updatedData.name;
        }
        const updatedFolder = await this.folderService.updateFolder(folderId, updateFields);
        if ("status" in updatedFolder) {
            res.status(updatedFolder.status).json({message: updatedFolder.message});
            return;
        }
        res.status(200).json(updatedFolder);
    }

    async deleteFolder(req: Request, res: Response) {
        const folderId = req.params.id;
        const deletedFolder = await this.folderService.deleteFolder(folderId);
        if ("status" in deletedFolder) {
            res.status(deletedFolder.status).json({message: deletedFolder.message});
            return;
        }
        res.status(200).json(deletedFolder);
    }

    async getFolderByUserId(req: Request, res: Response) {
        const userId = req.params.userId;
        const folder = await this.folderService.getFolderByUserId(userId);
        if ("status" in folder) {
            res.status(folder.status).json({message: folder.message});
            return;
        }
        res.status(200).json(folder);
    }

}