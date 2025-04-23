import logger from "../config/logger.config";
import {FileVaultRepository} from "../repository/file-vault.repository";
import {FileVaultDto} from "../dto/file-vault.dto";
import {UserRepository} from "../repository/user.repository";

export class FileVaultService {

    async getAllFiles() {
        let files = await FileVaultRepository.findAll();
        if (!files) {
            logger.info("No files found");
            return [];
        }
        return files.map(file => {
            return new FileVaultDto(file.name, file.size)
        });
    }

    async getFileById(id: string) {
        const file = await FileVaultRepository.findById(id);
        if (!file) {
            logger.info("File not found for ID:", id)
            return {status: 404, message: "File not found"};
        }
        logger.info(file.toString());
        return new FileVaultDto(file.name, file.size);
    }

    async createFile(fileData: any) {
        const {name, path, size, userId} = fileData;
        console.log(name, path, size, userId)
        const user = await UserRepository.findById(userId);
        if (!user) {
            return {status: 404, message: "User not found"};
        }

        const newFile = await FileVaultRepository.createFileVault(name, path, userId, size);
        if (!newFile) {
            return {status: 409, message: "File already exists"};
        }
        return new FileVaultDto(newFile.name, newFile.size);
    }

    async updateFile(id: string, updatedData: { name?: string; size?: number }) {
        const file = await FileVaultRepository.findById(id);
        if (!file) {
            return {status: 404, message: "File not found"};
        }
        let partialFile: Partial<FileVaultDto> = {
            name: updatedData.name,
            size: updatedData.size
        };
        await FileVaultRepository.updateFileVault(id, partialFile);
        return new FileVaultDto(
            partialFile.name || file.name,
            file.size
        );
    }

    async deleteFile(id: string) {
        const file = await FileVaultRepository.findById(id);
        if (!file) {
            return {status: 404, message: "File not found"};
        }
        await FileVaultRepository.deleteFileVault(id);
        return new FileVaultDto(file.name, file.size);
    }

    async getFileByUserId(userId: string) {
        const files = await FileVaultRepository.findByUserId(userId);
        if (!files) {
            return {status: 404, message: "Files not found"};
        }
        return files.map(file => {
            return new FileVaultDto(file.name, file.size)
        });
    }
}