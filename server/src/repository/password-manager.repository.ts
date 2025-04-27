import datasource from "../config/datasource.config";
import {PasswordManager} from "../entity/password-manager.entity";

/**
 * @const PasswordManagerRepository
 * @description This is a custom repository for the PasswordManager entity.
 * It extends the default repository provided by TypeORM and adds custom methods for password manager operations.
 * This repository is used to interact with the password_manager table in the database.
 */
export const PasswordManagerRepository = datasource.getRepository(PasswordManager).extend({
    findAll() {
        return this.createQueryBuilder("password_manager")
            .select([
                "password_manager.domain",
                "password_manager.username",
                "password_manager.password",
            ])
            .getMany();
    },

    findById(id: string) {
        return this.createQueryBuilder("password_manager")
            .select([
                "password_manager.domain",
                "password_manager.username",
                "password_manager.password",
            ])
            .where("password_manager.id = :id", {id})
            .getOne();
    },

    createPasswordManager(domain: string, username: string, password: string, userId: string) {
        const passwordManager = this.create({domain, username, password, userId});
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
            .select([
                "password_manager.domain",
                "password_manager.username",
                "password_manager.password",
            ])
            .where("password_manager.user_id = :userId", {userId})
            .getMany();
    },
})

