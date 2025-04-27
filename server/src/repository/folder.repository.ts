import {Folder} from "../entity/folder.entity";
import logger from "../config/logger.config";
import datasource from "../config/datasource.config";

/**
 * @const FolderRepository
 * @description This is a custom repository for the Folder entity.
 * It extends the default repository provided by TypeORM and adds custom methods for folder operations.
 * This repository is used to interact with the folder table in the database.
 */
export const FolderRepository = datasource.getRepository(Folder).extend({
    findAll() {
        return this.createQueryBuilder("folder_vault")
            .select([
                "folder_vault.id",
                "folder_vault.folderName",
                "folder_vault.parentId",
            ])
            .getMany();
    },

    findById(id: string) {
        return this.createQueryBuilder("folder_vault")
            .select([
                "folder_vault.id",
                "folder_vault.folderName",
                "folder_vault.parentId",
            ])
            .where("folder_vault.id = :id", {id})
            .getOne();
    },

    createFolder(folderName: string, parentId: string | undefined, userId: string) {
        const folder = this.create({folderName, parentId, userId});
        return this.save(folder);
    },

    updateFolder(id: string, updatedData: Partial<Folder>) {
        return this.createQueryBuilder("folder_vault")
            .update(Folder)
            .set(updatedData)
            .where("folder_id = :id", {id})
            .execute();
    },

    deleteFolder(id: string) {
        return this.createQueryBuilder("folder_vault")
            .delete()
            .from(Folder)
            .where("folder_id = :id", {id})
            .execute();
    },

    findByUserId(userId: string) {
        return this.createQueryBuilder("folder_vault")
            .select([
                "folder_vault.id",
                "folder_vault.folderName",
                "folder_vault.parentId",
            ])
            .where("folder_vault.user_id = :userId", {userId})
            .getMany();
    },

    findByParentId(parentId: string) {
        return this.createQueryBuilder("folder_vault")
            .select([
                "folder_vault.id",
                "folder_vault.folderName",
                "folder_vault.parentId",
            ])
            .where("folder_vault.parent_id = :parentId", {parentId})
            .getMany();
    },

})