"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedFileRepository = void 0;
const datasource_config_1 = __importDefault(require("../config/datasource.config"));
const shared_file_entity_1 = require("../entity/shared-file.entity");
/**
 * @const SharedFileRepository
 * @description This is a custom repository for the SharedFile entity.
 * It extends the default repository provided by TypeORM and adds custom methods for file operations.
 * This repository is used to interact with the file_shared table in the database.
 */
exports.SharedFileRepository = datasource_config_1.default.getRepository(shared_file_entity_1.SharedFile).extend({
    findAll() {
        return this.createQueryBuilder("file_shared")
            .select([
            "file_shared.id",
            "file_shared.fileName",
            "file_shared.fileSize",
            "file_shared.fileType",
            "file_shared.downloadsRemaining",
            "file_shared.timeToLive",
            "file_shared.createdAt",
        ])
            .getMany();
    },
    findById(id) {
        return this.createQueryBuilder("file_shared")
            .select([
            "file_shared.id",
            "file_shared.fileName",
            "file_shared.fileSize",
            "file_shared.fileType",
            "file_shared.storagePath",
            "file_shared.downloadsRemaining",
            "file_shared.timeToLive",
            "file_shared.createdAt",
        ])
            .where("file_shared.id = :id", { id })
            .getOne();
    },
    createFileShared(id, fileName, fileSize, fileType, storagePath, roomId, downloadsRemaining, timeToLive) {
        const fileShared = this.create({
            id,
            fileName,
            fileSize,
            fileType,
            roomId,
            downloadsRemaining,
            timeToLive,
            storagePath
        });
        return this.save(fileShared);
    },
    deleteFileShared(id) {
        return this.createQueryBuilder("file_shared")
            .delete()
            .from(shared_file_entity_1.SharedFile)
            .where("file_id = :id", { id })
            .execute();
    },
    findByRoomId(roomId) {
        return this.createQueryBuilder("file_shared")
            .select([
            "file_shared.id",
            "file_shared.fileName",
            "file_shared.fileSize",
            "file_shared.fileType",
            "file_shared.downloadsRemaining",
            "file_shared.timeToLive",
            "file_shared.createdAt",
        ])
            .where("file_shared.roomId = :roomId", { roomId })
            .getMany();
    },
});
