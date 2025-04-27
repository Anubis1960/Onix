import logger from "../config/logger.config";
import {SharedFileRepository} from "../repository/shared-file.repository";
import {SharedFileDto} from "../dto/shared-file.dto";
import {v4 as uuidv4} from "uuid";
import {StorageFileDto} from "../dto/storage-file.dto";

/**
 * @class SharedFileService
 * @description This class provides methods to manage shared files.
 * @method getAllFiles - Retrieves all shared files.
 * @method getFileById - Retrieves a shared file by its ID.
 * @method createFile - Creates a new shared file.
 * @method updateFile - Updates an existing shared file.
 * @method deleteFile - Deletes a shared file.
 */
export class SharedFileService {
    async getAllFiles() {
        let files = await SharedFileRepository.findAll();
        if (!files) {
            logger.info("No files found");
            return [];
        }
        return files.map(file => {
            return new SharedFileDto(
                file.id,
                file.fileName,
                file.fileSize,
                file.fileType,
                file.downloadsRemaining,
                file.timeToLive,
                file.createdAt
            );
        });
    }

    async getFileById(id: string) {
        const file = await SharedFileRepository.findById(id);
        if (!file) {
            logger.info("File not found for ID:", id)
            return null
        }
        logger.info(file.toString());
        return new SharedFileDto(
            file.id,
            file.fileName,
            file.fileSize,
            file.fileType,
            file.downloadsRemaining,
            file.timeToLive,
            file.createdAt
        );
    }

    async createFile(fileData: any) {
        const {name, size, type, downloadsRemaining, timeToLive, roomId} = fileData;
        const id = uuidv4();
        const storagePath = `${roomId}/${id}/${name}`;
        const newFile = await SharedFileRepository.createFileShared(id, name, size, type, storagePath, downloadsRemaining, timeToLive);
        if (!newFile) {
            return {status: 409, message: "File already exists"};
        }
        return new SharedFileDto(
            newFile.id,
            newFile.fileName,
            newFile.fileSize,
            newFile.fileType,
            newFile.downloadsRemaining,
            newFile.timeToLive,
            newFile.createdAt
        );
    }

    async updateFile(id: string, updatedData: {
        name?: string;
        size?: number;
        downloadsRemaining?: number;
        timeToLive?: number
    }) {
        const file = await SharedFileRepository.findById(id);
        if (!file) {
            return {status: 404, message: "File not found"};
        }
        let partialFile: Partial<SharedFileDto> = {
            fileName: updatedData.name,
            fileSize: updatedData.size,
            fileType: file.fileType,
            downloadsRemaining: updatedData.downloadsRemaining,
            timeToLive: updatedData.timeToLive,
        };
        await SharedFileRepository.updateFileShared(id, partialFile);
        const updatedFile = await SharedFileRepository.findById(id);
        if (!updatedFile) {
            return {status: 404, message: "File not found"};
        }
        return new SharedFileDto(
            updatedFile.id,
            updatedFile.fileName,
            updatedFile.fileSize,
            updatedFile.fileType,
            updatedFile.downloadsRemaining,
            updatedFile.timeToLive,
            updatedFile.createdAt
        );
    }

    async deleteFile(id: string) {
        const file = await SharedFileRepository.findById(id);
        if (!file) {
            return {status: 404, message: "File not found"};
        }
        await SharedFileRepository.deleteFileShared(id);
        return new StorageFileDto<SharedFileDto>(
            new SharedFileDto(
                file.id,
                file.fileName,
                file.fileSize,
                file.fileType,
                file.downloadsRemaining,
                file.timeToLive,
                file.createdAt
            ),
            file.storagePath
        );
    }
}