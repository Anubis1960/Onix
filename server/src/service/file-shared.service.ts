import logger from "../config/logger.config";
import {FileSharedRepository} from "../repository/file-shared.repository";
import {FileSharedDTO} from "../dto/file-shared.dto";

export class FileSharedService {
    async getAllFiles() {
        let files = await FileSharedRepository.findAll();
        if (!files) {
            logger.info("No files found");
            return [];
        }

        return files.map(file => {
            return new FileSharedDTO(file.name, file.size, file.downloadsRemaining, file.timeToLive, file.createdAt);
        });
    }

    async getFileById(id: string) {
        const file = await FileSharedRepository.findById(id);
        if (!file) {
            logger.info("File not found for ID:", id)
            return {status: 404, message: "File not found"};
        }
        logger.info(file.toString());
        return new FileSharedDTO(file.name, file.size, file.downloadsRemaining, file.timeToLive, file.createdAt);
    }

    async createFile(fileData: any) {
        const {name, path, downloadsRemaining, timeToLive, size} = fileData;
        const newFile = await FileSharedRepository.createFileShared(name, size, downloadsRemaining, timeToLive, path);
        if (!newFile) {
            return {status: 409, message: "File already exists"};
        }
        return new FileSharedDTO(newFile.name, newFile.size, newFile.downloadsRemaining, newFile.timeToLive, newFile.createdAt);
    }

    async updateFile(id: string, updatedData: {
        name?: string;
        size?: number;
        downloadsRemaining?: number;
        timeToLive?: number
    }) {
        const file = await FileSharedRepository.findById(id);
        if (!file) {
            return {status: 404, message: "File not found"};
        }
        let partialFile: Partial<FileSharedDTO> = {
            name: updatedData.name,
            size: updatedData.size,
            downloadsRemaining: updatedData.downloadsRemaining,
            timeToLive: updatedData.timeToLive
        };
        await FileSharedRepository.updateFileShared(id, partialFile);
        return new FileSharedDTO(
            partialFile.name || file.name,
            partialFile.size || file.size,
            partialFile.downloadsRemaining || file.downloadsRemaining,
            partialFile.timeToLive || file.timeToLive,
            partialFile.createdAt || file.createdAt
        );
    }

    async deleteFile(id: string) {
        const file = await FileSharedRepository.findById(id);
        if (!file) {
            return {status: 404, message: "File not found"};
        }
        await FileSharedRepository.deleteFileShared(id);
        return new FileSharedDTO(file.name, file.size, file.downloadsRemaining, file.timeToLive, file.createdAt);
    }
}