"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordManagerRepository = void 0;
const datasource_config_1 = __importDefault(require("../config/datasource.config"));
const password_manager_entity_1 = require("../entity/password-manager.entity");
/**
 * @const PasswordManagerRepository
 * @description This is a custom repository for the PasswordManager entity.
 * It extends the default repository provided by TypeORM and adds custom methods for password manager operations.
 * This repository is used to interact with the password_manager table in the database.
 */
exports.PasswordManagerRepository = datasource_config_1.default.getRepository(password_manager_entity_1.PasswordManager).extend({
    findAll() {
        return this.createQueryBuilder("password_manager")
            .select([
            "password_manager.domain",
            "password_manager.username",
            "password_manager.password",
        ])
            .getMany();
    },
    findById(id) {
        return this.createQueryBuilder("password_manager")
            .select([
            "password_manager.domain",
            "password_manager.username",
            "password_manager.password",
        ])
            .where("password_manager.id = :id", { id })
            .getOne();
    },
    createPasswordManager(domain, username, password, userId) {
        const passwordManager = this.create({ domain, username, password, userId });
        return this.save(passwordManager);
    },
    updatePasswordManager(id, updatedData) {
        return this.createQueryBuilder("password_manager")
            .update(password_manager_entity_1.PasswordManager)
            .set(updatedData)
            .where("password_id = :id", { id })
            .execute();
    },
    deletePasswordManager(id) {
        return this.createQueryBuilder("password_manager")
            .delete()
            .from(password_manager_entity_1.PasswordManager)
            .where("password_id = :id", { id })
            .execute();
    },
    findByUserId(userId) {
        return this.createQueryBuilder("password_manager")
            .select([
            "password_manager.domain",
            "password_manager.username",
            "password_manager.password",
        ])
            .where("password_manager.user_id = :userId", { userId })
            .getMany();
    },
});
