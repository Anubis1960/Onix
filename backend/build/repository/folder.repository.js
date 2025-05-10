"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderRepository = void 0;
const folder_entity_1 = require("../entity/folder.entity");
const datasource_config_1 = __importDefault(require("../config/datasource.config"));
/**
 * @const FolderRepository
 * @description This is a custom repository for the Folder entity.
 * It extends the default repository provided by TypeORM and adds custom methods for folder operations.
 * This repository is used to interact with the folder table in the database.
 */
exports.FolderRepository = datasource_config_1.default.getRepository(folder_entity_1.Folder).extend({
    findAll() {
        return this.createQueryBuilder("folder_vault")
            .select([
            "folder_vault.id",
            "folder_vault.folderName",
            "folder_vault.parentId",
        ])
            .getMany();
    },
    findById(id) {
        return this.createQueryBuilder("folder_vault")
            .select([
            "folder_vault.id",
            "folder_vault.folderName",
            "folder_vault.parentId",
        ])
            .where("folder_vault.id = :id", { id })
            .getOne();
    },
    createFolder(folderName, parentId, userId) {
        const folder = this.create({ folderName, parentId, userId });
        return this.save(folder);
    },
    updateFolder(id, updatedData) {
        return this.createQueryBuilder("folder_vault")
            .update(folder_entity_1.Folder)
            .set(updatedData)
            .where("folder_id = :id", { id })
            .execute();
    },
    deleteFolder(id) {
        return this.createQueryBuilder("folder_vault")
            .delete()
            .from(folder_entity_1.Folder)
            .where("folder_id = :id", { id })
            .execute();
    },
    findByUserId(userId) {
        return this.createQueryBuilder("folder_vault")
            .select([
            "folder_vault.id",
            "folder_vault.folderName",
            "folder_vault.parentId",
        ])
            .where("folder_vault.user_id = :userId", { userId })
            .getMany();
    },
    findByParentId(parentId) {
        return this.createQueryBuilder("folder_vault")
            .select([
            "folder_vault.id",
            "folder_vault.folderName",
            "folder_vault.parentId",
        ])
            .where("folder_vault.parent_id = :parentId", { parentId })
            .getMany();
    },
    findFolderIdsByParentId(parentId) {
        return this.createQueryBuilder("folder_vault")
            .select([
            "folder_vault.id",
        ])
            .where("folder_vault.parent_id = :parentId", { parentId })
            .getMany();
    },
    findFolderIdsByUserId(userId) {
        return this.createQueryBuilder("folder_vault")
            .select([
            "folder_vault.id",
        ])
            .where("folder_vault.user_id = :userId", { userId })
            .getMany();
    },
});
