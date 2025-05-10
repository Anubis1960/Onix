import logger from "../config/logger.config";
import {Folder} from "../entity/folder.entity";
import {FolderRepository} from "../repository/folder.repository";
import {FolderDto} from "../dto/folder.dto";
import {UserRepository} from "../repository/user.repository";

/**
 * @class FolderService
 * @description This class provides methods to manage folders in the file vault application.
 * @method getAllFolders - Retrieves all folders from the database.
 * @method getFolderById - Retrieves a folder by its ID.
 * @method createFolder - Creates a new folder.
 * @method updateFolder - Updates an existing folder.
 * @method deleteFolder - Deletes a folder.
 * @method getFoldersByUserId - Retrieves folders by user ID.
 */
export class FolderService {
    async getAllFolders() {
        let folders = await FolderRepository.findAll();
        if (!folders) {
            logger.info("No folders found");
            return [];
        }
        return folders.map(folder => {
            return new FolderDto(
                folder.id,
                folder.folderName,
                folder.parentId,
            );
        });
    }

    async getFolderById(id: string) {
        const folder = await FolderRepository.findById(id);
        if (!folder) {
            logger.info("Folder not found for ID:", id)
            return null
        }
        logger.info(folder.toString());
        return new FolderDto(
            folder.id,
            folder.folderName,
            folder.parentId
        );
    }

    async createFolder(folderData: any) {
        const {name, parentId, userId} = folderData;
        if (parentId) {
            const parentFolder = await FolderRepository.findById(parentId);
            if (!parentFolder) {
                return {status: 404, message: "Parent folder not found"};
            }
        }
        const user = await UserRepository.findById(userId);
        if (!user) {
            return {status: 404, message: "User not found"};
        }
        const folder = await FolderRepository.createFolder(name, parentId, userId);
        if (!folder) {
            return {status: 500, message: "Folder creation failed"};
        }
        return new FolderDto(
            folder.id,
            folder.folderName,
            folder.parentId,
        );
    }

    async updateFolder(id: string, updatedData: { folderName?: string, parentId?: string }) {
        const folder = await FolderRepository.findById(id);
        if (!folder) {
            return {status: 404, message: "Folder not found"};
        }
        let partialFolder: Partial<Folder> = {
            folderName: updatedData.folderName,
            parentId: updatedData.parentId,
        }
        await FolderRepository.updateFolder(id, partialFolder);
        return new FolderDto(
            folder.id,
            partialFolder.folderName || folder.folderName,
            partialFolder.parentId || folder.parentId,
        );
    }

    async deleteFolder(id: string) {
        const folder = await FolderRepository.findById(id);
        if (!folder) {
            return {status: 404, message: "Folder not found"};
        }
        const deletedFolder = await FolderRepository.deleteFolder(id);
        if (!deletedFolder) {
            return {status: 500, message: "Failed to delete folder"};
        }
        return {status: 200, message: "Folder deleted successfully"};
    }

    async getFoldersByUserId(userId: string) {
        const folders = await FolderRepository.findByUserId(userId);
        if (!folders) {
            logger.info("No folders found for user ID:", userId)
            return []
        }
        return folders.map(folder => {
            return new FolderDto(
                folder.id,
                folder.folderName,
                folder.parentId,
            );
        });
    }

    async getFoldersByParentId(parentId: string) {
        const folders = await FolderRepository.findByParentId(parentId);
        if (!folders) {
            logger.info("No folders found for parent ID:", parentId)
            return []
        }
        logger.info(folders);
        return folders.map(folder => {
            return new FolderDto(
                folder.id,
                folder.folderName,
                folder.parentId
            );
        });
    }

    async getIdsByParentId(parentId: string) {
        const folders = await FolderRepository.findFolderIdsByParentId(parentId);
        if (!folders) {
            logger.info("No folders found for parent ID:", parentId)
            return []
        }
        logger.info(folders);
        return folders.map(folder => {
            return folder.id;
        });
    }

    async getFoldersIdsByUserId(userId: string) {
        const folders = await FolderRepository.findFolderIdsByUserId(userId);
        if (!folders) {
            logger.info("No folders found for user ID:", userId)
            return []
        }
        return folders.map(folder => {
            return folder.id;
        });
    }
}