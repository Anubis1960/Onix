import datasource from "../config/datasource.config";
import {PasswordManager} from "../entity/password-manager.entity";

export const PasswordManagerRepository = datasource.getRepository(PasswordManager).extend({
    findAll() {
        return this.createQueryBuilder("password_manager")
            .getMany();
    },

    findById(id: string) {
        return this.createQueryBuilder("password_manager")
            .where("password_manager.id = :id", {id})
            .getOne();
    },

    createPasswordManager(name: string, password: string, userId: string) {
        const passwordManager = this.create({name, password, userId});
        return this.save(passwordManager);
    },

    updatePasswordManager(id: string, updatedData: Partial<PasswordManager>) {
        return this.createQueryBuilder("password_manager")
            .update(PasswordManager)
            .set(updatedData)
            .where("password_id = :id", {id})
            .execute();
    },

    deletePasswordManager(id: string) {
        return this.createQueryBuilder("password_manager")
            .delete()
            .from(PasswordManager)
            .where("password_id = :id", {id})
            .execute();
    },

    findByUserId(userId: string) {
        return this.createQueryBuilder("password_manager")
            .where("password_manager.user_id = :userId", {userId})
            .getMany();
    },
})

