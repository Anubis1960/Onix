import datasource from "../config/datasource.config";
import {FileVault} from "../entity/file-vault.entity";

export const FileVaultRepository = datasource.getRepository(FileVault).extend({
    findAll() {
        return this.createQueryBuilder("file_vault")
            .getMany();
    },

    findById(id: string) {
        return this.createQueryBuilder("file_vault")
            .where("file_vault.id = :id", {id})
            .getOne();
    },

    createFileVault(name: string, path: string, userId: string, size: number) {
        const fileVault = this.create({name, path, userId, size});
        return this.save(fileVault);
    },

    updateFileVault(id: string, updatedData: Partial<FileVault>) {
        return this.createQueryBuilder("file_vault")
            .update(FileVault)
            .set(updatedData)
            .where("file_id = :id", {id})
            .execute();
    },

    deleteFileVault(id: string) {
        return this.createQueryBuilder("file_vault")
            .delete()
            .from(FileVault)
            .where("file_id = :id", {id})
            .execute();
    },

    findByUserId(userId: string) {
        return this.createQueryBuilder("file_vault")
            .where("file_vault.user_id = :userId", {userId})
            .getMany();
    },
})