"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRepository = void 0;
const datasource_config_1 = __importDefault(require("../config/datasource.config"));
const file_entity_1 = require("../entity/file.entity");
/**
 * @const FileRepository
 * @description This is a custom repository for the File entity.
 * It extends the default repository provided by TypeORM and adds custom methods for file operations.
 * This repository is used to interact with the file table in the database.
 */
exports.FileRepository = datasource_config_1.default.getRepository(file_entity_1.File).extend({
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
    findById(id) {
        return this.createQueryBuilder("file_vault")
            .select([
            "file_vault.id",
            "file_vault.fileName",
            "file_vault.fileSize",
            "file_vault.fileType",
            "file_vault.folderId",
            "file_vault.storagePath",
        ])
            .where("file_vault.id = :id", { id })
            .getOne();
    },
    createFile(id, fileName, fileSize, fileType, storagePath, folderId) {
        const file = this.create({ id, fileName, storagePath, fileSize, fileType, folderId });
        return this.save(file);
    },
    updateFile(id, updatedData) {
        return this.createQueryBuilder("file_vault")
            .update(file_entity_1.File)
            .set(updatedData)
            .where("file_id = :id", { id })
            .execute();
    },
    deleteFile(id) {
        return this.createQueryBuilder("file_vault")
            .delete()
            .from(file_entity_1.File)
            .where("file_id = :id", { id })
            .execute();
    },
    findByFolderId(folderId) {
        return this.createQueryBuilder("file_vault")
            .select([
            "file_vault.id",
            "file_vault.fileName",
            "file_vault.fileSize",
            "file_vault.fileType",
            "file_vault.folderId",
        ])
            .where("file_vault.folder_id = :folderId", { folderId })
            .getMany();
    },
});
