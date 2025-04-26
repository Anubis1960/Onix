import datasource from "../config/datasource.config";
import {File} from "../entity/file.entity";

/**
 * @const FileRepository
 * @description This is a custom repository for the File entity.
 * It extends the default repository provided by TypeORM and adds custom methods for file operations.
 * This repository is used to interact with the file table in the database.
 */
export const FileRepository = datasource.getRepository(File).extend({
    findAll() {
        return this.createQueryBuilder("file_vault")
            .getMany();
    },

    findById(id: string) {
        return this.createQueryBuilder("file_vault")
            .where("file_vault.id = :id", {id})
            .getOne();
    },

    createFile(fileName: string, storagePath: string, fileSize: number, fileType: string, folderId: string) {
        const file = this.create({fileName, storagePath, fileSize, fileType, folderId});
        return this.save(file);
    },

    updateFile(id: string, updatedData: Partial<File>) {
        return this.createQueryBuilder("file_vault")
            .update(File)
            .set(updatedData)
            .where("file_id = :id", {id})
            .execute();
    },

    deleteFile(id: string) {
        return this.createQueryBuilder("file_vault")
            .delete()
            .from(File)
            .where("file_id = :id", {id})
            .execute();
    },

    findByFolderId(folderId: string) {
        return this.createQueryBuilder("file_vault")
            .where("file_vault.folder_id = :folderId", {folderId})
            .getMany();
    },
})