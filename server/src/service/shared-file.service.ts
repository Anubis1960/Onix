import logger from "../config/logger.config";
import {SharedFileRepository} from "../repository/shared-file.repository";
import {SharedFileDto} from "../dto/shared-file.dto";
import {v4 as uuidv4} from "uuid";
import {StorageFileDto} from "../dto/storage-file.dto";
import {FileRepository} from "../repository/file.repository";

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
        if (file.createdAt.getTime() + file.timeToLive * 3600 * 1000 < new Date().getTime()) {
            logger.info("File expired for ID:", id);
            return null;
        }
        if (file.downloadsRemaining <= 0) {
            logger.info("File downloads remaining for ID:", id);
            return null;
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
        const newFile = await SharedFileRepository
            .createFileShared(id, name, size, type, storagePath, roomId, downloadsRemaining, timeToLive);
        if (!newFile) {
            return {status: 409, message: "Error creating file"};
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

    async getFilesByRoomId(roomId: string) {
        const files = await SharedFileRepository.findByRoomId(roomId);
        if (!files) {
            logger.info("No files found for room ID:", roomId)
            return [];
        }
        if (files[0].createdAt.getTime() + files[0].timeToLive * 3600 * 1000 < new Date().getTime()) {
            logger.info("File expired for room ID:", roomId);
            return [];
        }
        if (files[0].downloadsRemaining <= 0) {
            logger.info("File downloads remaining for room ID:", roomId);
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

    async getMetadataById(id: string) {
        const file = await FileRepository.findById(id);
        if (!file) {
            logger.info("No files found for folder ID:", id);
            return {};
        }
        return {
            storagePath: file.storagePath,
            fileName: file.fileName,
            fileSize: file.fileSize,
            fileType: file.fileType,
        }
    }
}