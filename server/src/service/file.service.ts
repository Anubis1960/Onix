import logger from "../config/logger.config";
import {FileRepository} from "../repository/file.repository";
import {FileDto} from "../dto/file.dto";
import supabase from "../config/supabase.config";
import {v4 as uuidv4} from "uuid";
import {FileMetadata} from "../entity/file.metadata";

/**
 * @class FileService
 * @description This class handles file-related operations.
 * @method getAllFiles - Retrieves all files.
 * @method getFileById - Retrieves a file by its ID.
 * @method createFile - Creates a new file.
 * @method updateFile - Updates an existing file.
 * @method deleteFile - Deletes a file.
 * @method getFilesByFolderId - Retrieves files by folder ID.
 */
export class FileService {
    async getAllFiles() {
        let files = await FileRepository.findAll();
        logger.info(files);
        if (!files) {
            logger.info("No files found");
            return [];
        }
        return files.map(file => {
            return new FileDto(
                file.id,
                file.fileName,
                file.fileSize,
                file.fileType,
                file.folderId
            );
        });
    }

    async getFileById(id: string) {
        const file = await FileRepository.findById(id);
        if (!file) {
            return null
        }
        logger.info(file.toString());
        return new FileDto(
            file.id,
            file.fileName,
            file.fileSize,
            file.fileType,
            file.folderId
        );
    }

    async createFile(fileData: any) {
        const {name, size, type, folderId, userId} = fileData;
        const id = uuidv4();
        const storagePath = `${userId}/${id}/${name}`;

        const file = await FileRepository.createFile(id, name, size, type, storagePath, folderId);
        logger.info(file);
        if (!file) {
            return {status: 500, message: "File creation failed"};
        }
        return new FileDto(
            file.id,
            file.fileName,
            file.fileSize,
            file.fileType,
            file.folderId
        );
    }

    async updateFile(id: string, updatedData: { name?: string, folderId?: string }) {
        const file = await FileRepository.findById(id);
        if (!file) {
            return {status: 404, message: "File not found"};
        }
        let partialFile: Partial<FileDto> = {
            fileName: updatedData.name,
            folderId: updatedData.folderId,
        }
        await FileRepository.updateFile(id, partialFile);
        return new FileDto(
            file.id,
            partialFile.fileName || file.fileName,
            file.fileSize,
            file.fileType,
            file.folderId
        );
    }

    async deleteFile(id: string) {
        const file = await FileRepository.findById(id);
        if (!file) {
            return {status: 404, message: "File not found"};
        }
        await FileRepository.deleteFile(id);
        return new FileDto(
            file.id,
            file.fileName,
            file.fileSize,
            file.fileType,
            file.folderId
        );
    }

    async getFilesByFolderId(folderId: string) {
        const files = await FileRepository.findByFolderId(folderId);
        if (!files) {
            logger.info("No files found for folder ID:", folderId);
            return [];
        }
        return files.map(file => {
            return new FileDto(
                file.id,
                file.fileName,
                file.fileSize,
                file.fileType,
                file.folderId
            )
        });
    }
}