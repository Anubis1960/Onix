import datasource from "../config/datasource.config";
import {SharedFile} from "../entity/shared-file.entity";

/**
 * @const SharedFileRepository
 * @description This is a custom repository for the SharedFile entity.
 * It extends the default repository provided by TypeORM and adds custom methods for file operations.
 * This repository is used to interact with the file_shared table in the database.
 */
export const SharedFileRepository = datasource.getRepository(SharedFile).extend({
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

    findById(id: string) {
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
            .where("file_shared.id = :id", {id})
            .getOne();
    },

    createFileShared(id: string, fileName: string, fileSize: number, fileType: string, storagePath: string, downloadsRemaining: number, timeToLive: number) {
        const fileShared = this.create({id, fileName, fileSize, fileType, downloadsRemaining, timeToLive, storagePath});
        return this.save(fileShared);
    },

    updateFileShared(id: string, updatedData: Partial<SharedFile>) {
        return this.createQueryBuilder("file_shared")
            .update(SharedFile)
            .set(updatedData)
            .where("file_id = :id", {id})
            .execute();
    },

    deleteFileShared(id: string) {
        return this.createQueryBuilder("file_shared")
            .delete()
            .from(SharedFile)
            .where("file_id = :id", {id})
            .execute();
    },
})

