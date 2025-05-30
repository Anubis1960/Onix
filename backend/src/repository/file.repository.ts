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
            .select([
                "file_vault.id",
                "file_vault.fileName",
                "file_vault.fileSize",
                "file_vault.fileType",
                "file_vault.folderId",
            ])
            .getMany();
    },

    findById(id: string) {
        return this.createQueryBuilder("file_vault")
            .select([
                "file_vault.id",
                "file_vault.fileName",
                "file_vault.fileSize",
                "file_vault.fileType",
                "file_vault.folderId",
                "file_vault.storagePath",
            ])
            .where("file_vault.id = :id", {id})
            .getOne();
    },

    createFile(id: string, fileName: string, fileSize: number, fileType: string, storagePath: string, folderId: string) {
        const file = this.create({id, fileName, storagePath, fileSize, fileType, folderId});
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
            .select([
                "file_vault.id",
                "file_vault.fileName",
                "file_vault.fileSize",
                "file_vault.fileType",
                "file_vault.folderId",
            ])
            .where("file_vault.folder_id = :folderId", {folderId})
            .getMany();
    },
})