"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const datasource_config_1 = __importDefault(require("../config/datasource.config"));
const user_entity_1 = require("../entity/user.entity");
/**
 * @class UserRepository
 * @description This class provides methods to interact with the User entity in the database.
 * It extends the default repository provided by TypeORM and adds custom methods for user operations.
 * This repository is used to interact with the user table in the database.
 */
exports.UserRepository = datasource_config_1.default.getRepository(user_entity_1.User).extend({
    findAll() {
        return this.createQueryBuilder("user")
            .select([
            "user.id",
        ])
            .getMany();
    },
    findByEmail(email) {
        return this.createQueryBuilder("user")
            .select([
            "user.id",
        ])
            .where("user.email = :email", { email })
            .getOne();
    },
    findById(id) {
        return this.createQueryBuilder("user")
            .select([
            "user.id",
        ])
            .where("user.id = :id", { id })
            .getOne();
    },
    createUser(email, password) {
        const user = this.create({ email, password });
        return this.save(user);
    },
    updateUser(id, updatedData) {
        return this.createQueryBuilder("user")
            .update(user_entity_1.User)
            .set(updatedData)
            .where("user_id = :id", { id })
            .execute();
    },
    deleteUser(id) {
        return this.createQueryBuilder("user")
            .delete()
            .from(user_entity_1.User)
            .where("user_id = :id", { id })
            .execute();
    },
});
