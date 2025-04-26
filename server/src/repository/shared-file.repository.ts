import datasource from "../config/datasource.config";
import {SharedFile} from "../entity/shared-file.entity";

export const SharedFileRepository = datasource.getRepository(SharedFile).extend({
    findAll() {
        return this.createQueryBuilder("file_shared")
            .getMany();
    },

    findById(id: string) {
        return this.createQueryBuilder("file_shared")
            .where("file_shared.id = :id", {id})
            .getOne();
    },

    createFileShared(fileName: string, fileSize: number, downloadsRemaining: number, timeToLive: number, storagePath: string) {
        const fileShared = this.create({fileName, fileSize, downloadsRemaining, timeToLive, storagePath});
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

