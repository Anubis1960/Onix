import logger from "../config/logger.config";
import {Folder} from "../entity/folder.entity";
import {FolderRepository} from "../repository/folder.repository";
import {FolderDto} from "../dto/folder.dto";

export class FolderService {
    async getAllFolders() {
        let folders = await FolderRepository.findAll();
        if (!folders) {
            logger.info("No folders found");
            return [];
        }
        return folders.map(folder => {
            return new FolderDto(folder.folderName, folder.parentId, folder.userId);
        });
    }

    async getFolderById(id: string) {
        const folder = await FolderRepository.findById(id);
        if (!folder) {
            logger.info("Folder not found for ID:", id)
            return {status: 404, message: "Folder not found"};
        }
        logger.info(folder.toString());
        return new FolderDto(folder.folderName, folder.parentId, folder.userId);
    }

    async createFolder(folderData: any) {
        const {name, parentId, userId} = folderData;
        if (!name || !userId) {
            return {status: 400, message: "Name and userId are required"};
        }
        const folder = await FolderRepository.createFolder(name, parentId, userId);
        if (!folder) {
            return {status: 500, message: "Folder creation failed"};
        }
        return new FolderDto(folder.folderName, folder.parentId, folder.userId);
    }

    async updateFolder(id: string, updatedData: { name?: string }) {
        const folder = await FolderRepository.findById(id);
        if (!folder) {
            return {status: 404, message: "Folder not found"};
        }
        let partialFolder: Partial<Folder> = {
            folderName: updatedData.name
        }
        await FolderRepository.updateFolder(id, partialFolder);
        return new FolderDto(
            partialFolder.folderName || folder.folderName,
            folder.parentId,
            folder.userId
        );
    }

    async deleteFolder(id: string) {
        const folder = await FolderRepository.deleteFolder(id);
        if (!folder) {
            return {status: 404, message: "Folder not found"};
        }
        return {status: 200, message: "Folder deleted successfully"};
    }

    async getFolderByUserId(userId: string) {
        const folders = await FolderRepository.findByUserId(userId);
        if (!folders) {
            logger.info("No folders found for user ID:", userId)
            return {status: 404, message: "No folders found"};
        }
        return folders.map(folder => {
            return new FolderDto(folder.folderName, folder.parentId, folder.userId);
        });
    }
}