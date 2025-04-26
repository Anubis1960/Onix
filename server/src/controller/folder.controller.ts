import {Request, Response} from "express";
import logger from "../config/logger.config";
import {FolderService} from "../service/folder.service";
import {FileService} from "../service/file.service";

/**
 * FolderController handles folder-related requests.
 * @class FolderController
 * @param {FolderService} folderService - Instance of FolderService for folder-related operations.
 * @constructor
 * @method getAllFolders - Retrieves all folders.
 * @method getFolderById - Retrieves a folder by its ID.
 * @method createFolder - Creates a new folder instance.
 * @method updateFolder - Updates an existing folder.
 * @method deleteFolder - Deletes a folder.
 * @method getFoldersByUserId - Retrieves folders by user ID.
 */
export class FolderController {
    private folderService: FolderService;
    private fileService: FileService;

    constructor() {
        this.folderService = new FolderService();
        this.fileService = new FileService();
    }

    async getAllFolders(req: Request, res: Response) {
        const folders = await this.folderService.getAllFolders();
        res.status(200).json(folders);
    };

    async getFolderById(req: Request, res: Response) {
        const folderId = req.params.id;
        const folder = await this.folderService.getFolderById(folderId);
        if (folder === null) {
            res.status(404).json({message: "Folder not found"});
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

    async getFoldersByUserId(req: Request, res: Response) {
        const userId = req.params.userId;
        const folder = await this.folderService.getFoldersByUserId(userId);
        res.status(200).json(folder);
    }

    async getChildrenByParentId(req: Request, res: Response) {
        const parentId = req.params.parentId;
        const result = {
            files: this.fileService.getFilesByFolderId(parentId),
            folders: this.folderService.getFoldersByParentId(parentId)
        }
        res.status(200).json(result);
    }

}