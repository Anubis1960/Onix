import datasource from "../config/datasource.config";
import {FileShared} from "../entity/file-shared.entity";

export const FileSharedRepository = datasource.getRepository(FileShared).extend({
    findAll() {
        return this.createQueryBuilder("file_shared")
            .getMany();
    },

    findById(id: string) {
        return this.createQueryBuilder("file_shared")
            .where("file_shared.id = :id", {id})
            .getOne();
    },

    createFileShared(name: string, size: number, timeToLive: number, downloadsRemaining: number, path: string) {
        const fileShared = this.create({name, path, size, timeToLive, downloadsRemaining});
        return this.save(fileShared);
    },

    updateFileShared(id: string, updatedData: Partial<FileShared>) {
        return this.createQueryBuilder("file_shared")
            .update(FileShared)
            .set(updatedData)
            .where("file_id = :id", {id})
            .execute();
    },

    deleteFileShared(id: string) {
        return this.createQueryBuilder("file_shared")
            .delete()
            .from(FileShared)
            .where("file_id = :id", {id})
            .execute();
    },
})

