import logger from "../config/logger.config";
import {FileRepository} from "../repository/file.repository";
import {FileDto} from "../dto/file.dto";

export class FileService {
    async getAllFiles() {
        let files = await FileRepository.findAll();
        if (!files) {
            logger.info("No files found");
            return [];
        }
        return files.map(file => {
            return new FileDto(file.fileName, file.fileSize, file.fileType, file.folderId);
        });
    }

    async getFileById(id: string) {
        const file = await FileRepository.findById(id);
        if (!file) {
            logger.info("File not found for ID:", id)
            return {status: 404, message: "File not found"};
        }
        logger.info(file.toString());
        return new FileDto(file.fileName, file.fileSize, file.fileType, file.folderId);
    }

    async createFile(fileData: any) {
        const {name, size, type, folderId, storagePath} = fileData;
        if (!name || !size || !type || !folderId) {
            return {status: 400, message: "Name, size, type and folderId are required"};
        }

        const file = await FileRepository.createFile(name, storagePath, size, type, folderId);
        if (!file) {
            return {status: 500, message: "File creation failed"};
        }
        return new FileDto(
            file.fileName,
            file.fileSize,
            file.fileType,
            file.folderId
        );
    }

    async updateFile(id: string, updatedData: { name?: string; size?: number }) {
        const file = await FileRepository.findById(id);
        if (!file) {
            return {status: 404, message: "File not found"};
        }
        let partialFile: Partial<FileDto> = {
            fileName: updatedData.name,
            fileSize: updatedData.size,
            fileType: file.fileType,
        }
        await FileRepository.updateFile(id, partialFile);
        return new FileDto(
            partialFile.fileName || file.fileName,
            partialFile.fileSize || file.fileSize,
            partialFile.fileType || file.fileType,
            file.folderId
        );
    }

    async deleteFile(id: string) {
        const file = await FileRepository.findById(id);
        if (!file) {
            return {status: 404, message: "File not found"};
        }
        await FileRepository.deleteFile(id);
        return new FileDto(file.fileName, file.fileSize, file.fileType, file.folderId);
    }

    async getFileByFolderId(folderId: string) {
        const files = await FileRepository.findByFolderId(folderId);
        if (!files) {
            return {status: 404, message: "Files not found"};
        }
        return files.map(file => {
            return new FileDto(file.fileName, file.fileSize, file.fileType, file.folderId)
        });
    }
}